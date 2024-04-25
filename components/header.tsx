import React from "react";
import PageContainer from "./page-container";
import { HeaderNavigation } from "./hrader-navigation";
import ProfileButton from "./profile-button";
import ResponsiveMenu from "./responsive-menu";
import ToggleTheme from "./toggle-theme";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <PageContainer>
        <div className="flex items-center justify-between w-full">
          {/* responsive Menu */}
          <div className="flex items-center gap-2">
            <ResponsiveMenu />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
              NextBlog
            </h1>
          </div>

          {/* Navigation Menu */}
          <HeaderNavigation />

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <ToggleTheme />
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
