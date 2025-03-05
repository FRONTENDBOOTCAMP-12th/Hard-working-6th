import OpenAI from 'openai';
import CardList from '../Molecule/CardList';
import { useEffect, useState, useRef } from 'react';

const { VITE_GPTAPI_KEY } = import.meta.env;

const openai = new OpenAI({
  apiKey: VITE_GPTAPI_KEY,
  dangerouslyAllowBrowser: true,
});

function Tairo() {
  const [theme, setTheme] = useState('오늘의 운세');
  const [card, setCard] = useState('');
  const [msg, setMsg] = useState('');

  const isMounted = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (isMounted.current) {
      console.log('실행');
      async function fetchGpt() {
        try {
          const completion = await openai.chat.completions.create(
            {
              model: 'gpt-4o',
              messages: [
                {
                  role: 'developer',
                  content:
                    '당신은 경험이 풍부한 타로 마스터입니다. 사용자가 타로 카드를 뽑으면, 그 카드의 의미를 직관적으로 해석하고, 사용자의 고민에 맞는 조언을 제공합니다.사랑, 일, 금전, 건강, 인간관계 등 다양한 분야에 맞게 해석합니다. 사용자가 질문을 하면, 그 질문과 관련된 맥락에서 카드를 해석합니다. 마지막으로 가장 중요한 점은 답변을 할 때에 최대 300글자 내로 해야 합니다.',
                },
                {
                  role: 'user',
                  content: `나의 ${theme}을 봐줘. 타로 카드는 ${card} 카드를 뽑았어.`,
                },
              ],
              store: true,
            },
            {
              // AbortController의 signal 추가
              signal,
            }
          );

          setMsg(completion.choices[0].message.content as string);
          console.log(completion.choices[0].message);
        } catch (error) {
          if ((error as Error).message.includes('abort')) {
            console.warn('요청이 취소되었습니다.');
          } else {
            console.error('오류 발생:', error);
          }
        }
      }

      fetchGpt();
      return () => {
        controller.abort();
      };
    } else isMounted.current = true;
  }, [card]);

  return (
    <div>
      <h1>Tairo / {theme}</h1>
      <CardList setCard={setCard}></CardList>
      <h2>{card}</h2>

      <p>{msg}</p>
    </div>
  );
}

export default Tairo;
