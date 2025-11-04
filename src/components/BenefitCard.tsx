interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export const BenefitCard = ({ icon, title, description, delay = 0 }: BenefitCardProps) => {
  return (
    <div
      className="bg-card backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] hover:border-primary/30 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0 animate-float" style={{ animationDelay: `${delay}ms` }}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
