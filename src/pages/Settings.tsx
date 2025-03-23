import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function Setting() {
  return (
    <div>
      <h1 className="sr-only">Settings</h1>
      <Accordion type="single" collapsible className="text-white">
        <AccordionItem value="item-1">
          <AccordionTrigger>비밀번호 변경</AccordionTrigger>
          <AccordionContent>아코디언 매뉴입니다.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>지난 기록 삭제</AccordionTrigger>
          <AccordionContent>아코디언 매뉴입니다.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>어플 소개</AccordionTrigger>
          <AccordionContent>어플에 대한 내용</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Setting;
