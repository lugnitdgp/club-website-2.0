import React from "react";
import { AnimatedSpan, Terminal, TypingAnimation } from "../magicui/terminal";

function FullScreenLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {" "}
      <Terminal>
        <TypingAnimation>&gt; sudo -g install glug@latest </TypingAnimation>

        <AnimatedSpan delay={3500} className="text-green-500">
          <span>✔ Preflight checks.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4000} className="text-green-500">
          <span>✔ Fetching data... Hope the WiFi holds up!</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5000} className="text-green-500">
          <span>✔ Optimizing code... Because we can!</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5500} className="text-green-500">
          <span>✔ Processing request... Keep calm.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={6500} className="text-green-500">
          <span>✔ Executing task on your motherboard... Fingers crossed! 🤞</span>
        </AnimatedSpan>

        <AnimatedSpan delay={7000} className="text-red-500">
          <span>✔ Injecting glug/index.sh in your kernel files  </span>
        </AnimatedSpan>

        <AnimatedSpan delay={8500} className="text-red-500">
          <span>✔ Hacking Complete. Enjoy the virus</span>
        </AnimatedSpan>

        <AnimatedSpan delay={9000} className="text-blue-500">
          <span>ℹ Updated 1 file:</span>
          <span className="pl-2">- usr/bin/root.c</span>
        </AnimatedSpan>
        <TypingAnimation delay={10000} className="text-muted-foreground text-xl">
          Welcome to GNU/LINUX USERS' GROUP
        </TypingAnimation>
      </Terminal>
    </div>
  );
}

export default FullScreenLoader;
