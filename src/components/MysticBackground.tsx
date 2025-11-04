export const MysticBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(var(--mystic-darker))] to-background" />
      
      {/* Sparkle particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Mystical symbols */}
      <div className="absolute top-20 right-10 text-primary/10 text-6xl animate-float" style={{ animationDelay: '0.5s' }}>✦</div>
      <div className="absolute bottom-32 left-10 text-accent/10 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>✧</div>
      <div className="absolute top-1/2 right-1/4 text-primary/10 text-4xl animate-float" style={{ animationDelay: '2s' }}>❋</div>
    </div>
  );
};
