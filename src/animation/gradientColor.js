export  function GradientColor() {
    
      const cardGradients = [
                "linear-gradient(to bottom right, #f59e0b, #ef4444)", // Orange to Red
                "linear-gradient(to bottom right, #3b82f6, #ec4899)", // Blue to Pink
                "linear-gradient(to bottom right, #10b981, #06b6d4)", // Green to Cyan
                "linear-gradient(to bottom right, #0ea5e9, #8b5cf6)"  // Cyan to Purple
    ];
      const borderGradients = [
                "linear-gradient(to bottom right, #f59e0b, #ef4444, #ef4444, #f59e0b )", // Orange to Red
                "linear-gradient(to bottom right, #3b82f6, #ec4899)", // Blue to Pink
                "linear-gradient(to bottom right, #10b981, #06b6d4)", // Green to Cyan
                "linear-gradient(to bottom right, #0ea5e9, #8b5cf6)"  // Cyan to Purple
    ];
    return {
        cardGradients,borderGradients
    }
}