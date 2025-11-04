import { MysticBackground } from "@/components/MysticBackground";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { quizQuestions } from "@/data/quizQuestions";

const FriendQuiz = () => {
  const { toast } = useToast();

  const handleCopyQuestion = (questionText: string) => {
    navigator.clipboard.writeText(questionText);
    toast({
      title: "Скопировано",
      description: "Вопрос скопирован в буфер обмена",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <MysticBackground />
      
      <main className="relative z-10 px-4 sm:px-6 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Вопросы о вас
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Отправьте эти вопросы друзьям, чтобы узнать, как они вас видят
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {quizQuestions.map((question, index) => (
            <div
              key={index}
              className="group relative bg-[#1a1a2e]/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-primary/30 hover:bg-[#1a1a2e]/60"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-foreground/90 text-base sm:text-lg font-normal leading-relaxed flex-1">
                  {question.question_text}
                </p>
                
                <button
                  onClick={() => handleCopyQuestion(question.question_text)}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:scale-110"
                  aria-label="Копировать вопрос"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            variant="mystic"
            size="lg"
            className="flex-1"
            onClick={() => {
              const allQuestions = quizQuestions.map(q => q.question_text).join('\n\n');
              navigator.clipboard.writeText(allQuestions);
              toast({
                title: "Все вопросы скопированы",
                description: "Теперь вы можете отправить их друзьям",
              });
            }}
          >
            Скопировать все вопросы
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FriendQuiz;
