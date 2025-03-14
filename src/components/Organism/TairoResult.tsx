import OpenAI from 'openai';
import { useEffect, useState } from 'react';
import { useStore } from '@/stores/theme';
import cardData from '@/assets/data/card_data.json';
import paper from '/src/assets/paper.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { addMemoItem } from '@/utils/supabaseHistory';
import supabaseClient from '@/utils/SupabaseClient';

const { VITE_GPTAPI_KEY } = import.meta.env;

const openai = new OpenAI({
  apiKey: VITE_GPTAPI_KEY,
  dangerouslyAllowBrowser: true,
});

function TairoResult() {
  const theme = useStore((state) => state.theme);
  const card = useStore((state) => state.card);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const processData = async () => {
      setLoading(true);

      try {
        const { data } = await supabaseClient.auth.getUser();
        const userId = data.user?.id;

        if (!userId) {
          console.error('사용자 ID를 가져올 수 없습니다.');
          return;
        }

        setUserData(userId);
        console.log('유저 데이터:', userId);

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
            signal,
          }
        );

        const gptMessage = completion.choices[0].message.content as string;
        console.log('GPT 응답 받음:', gptMessage);

        setMsg(gptMessage);

        const insertData = {
          card_theme: theme,
          card_name: card,
          content: gptMessage,
          user_id: userId,
        };

        console.log('저장할 데이터:', insertData);
        await addMemoItem(insertData);
        console.log('데이터 저장 완료');

        setLoading(false);
      } catch (error) {
        if ((error as Error).message.includes('abort')) {
          console.warn('요청이 취소되었습니다.');
        } else {
          console.error('오류 발생:', error);
        }
        setLoading(false);
      }
    };

    processData();

    return () => {
      controller.abort();
    };
  }, [card, theme]);

  const isSelectedCard = cardData.cards.find(({ name }) => name === card)!;

  return loading ? (
    <div className="flex flex-col justify-center items-center w-full h-100 mt-20">
      <DotLottieReact src="/assets/loading-image.json" loop autoplay />{' '}
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col">
      <img
        src={isSelectedCard.src}
        alt={`${card} 카드`}
        className="w-30 h-52 rounded-lg overflow-hidden z-10"
      />

      <section className="relative">
        <img src={paper} alt="결과" className="w-full -mt-24 absolute z-0" />

        <div className="relative z-10 mt-10 text-black">
          <strong className="ml-8">{card}</strong>
          <p className="m-8 mt-4">{msg}</p>
        </div>
      </section>
    </div>
  );
}

export default TairoResult;
