"use client";

import { CarbonLogoGoogle, CarbonLogoGithub } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export function Social() {
  return (
    <div className="flex items-center w-full gap-2">
      <Button variant="outline" size="lg" className="w-full">
        <CarbonLogoGoogle className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        <CarbonLogoGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
