'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Compass } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/shadcn/dropdown-menu';

const navItems = [
  { href: '/library', label: '精选库' },
  { href: '/daily', label: '每日速递' },
  { href: '/topics', label: '专题' },
  { href: '/ranking', label: '排行榜' },
  { href: '/about', label: '关于' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="navbar"
      className="fixed top-0 w-full border-b border-gray-100 bg-white"
      style={{ zIndex: '9999', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-gray-900"
            aria-label="深选 - 返回首页"
          >
            <Compass className="mr-2 h-5 w-5" aria-hidden="true" />
            <span>深选</span>
          </Link>

          {/* 桌面端导航 */}
          <nav
            className="hidden items-center space-x-1 md:flex"
            aria-label="主导航"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-item text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 用户操作区 */}
          <div className="flex items-center space-x-3">
            {/* 用户头像下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-full focus:outline-none"
                  aria-label="用户菜单"
                >
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[10000] w-48">
                <DropdownMenuItem>个人中心</DropdownMenuItem>
                <DropdownMenuItem>我的收藏</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 移动端菜单按钮 */}
            <button
              className="text-gray-600 focus:outline-none md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="pb-4 md:hidden" role="menu" aria-label="移动导航">
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-item text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
