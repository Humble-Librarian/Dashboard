
import React from "react";
import { Bell, Search, User, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  isMobileMenuOpen = false 
}) => {
  return (
    <header className="h-16 px-4 md:px-6 border-b border-border flex items-center justify-between bg-white/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={onMenuToggle}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        <div className="md:hidden font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          FinWise
        </div>
        
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 h-9 rounded-full bg-secondary border-none focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-full"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-3 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 hover:bg-muted/50 cursor-pointer flex gap-3 border-b border-border transition-colors",
                    i === 1 && "bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "w-2 self-stretch rounded-full",
                    i === 1 ? "bg-primary" : "bg-transparent"
                  )} />
                  <div>
                    <p className="text-sm font-medium">New daily tip available</p>
                    <p className="text-xs text-muted-foreground">Today at 9:42 AM</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="text-xs w-full">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-primary text-primary-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                Subscription
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
