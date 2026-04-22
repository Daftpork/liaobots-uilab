/**
 * UI Lab — Liaobots redesign/ui-v2 设计语言总览(纯静态版)
 *
 * 内容与原项目 pages/uilab.tsx 完全一致,只做以下适配:
 *   - next/image  → 普通 <img>
 *   - next/head   → 入口 index.html 已设置 <title>
 *   - 去掉 getServerSideProps
 *
 * 内容分区:
 *   1. Foundations  — 色板 / 字体 / 圆角 / 阴影
 *   2. Brand        — Logo 三套尺寸 + 导航 tab 图
 *   3. Icons        — 全站 Lucide 化后的图标尺寸/线宽规范
 *   4. Hover        — hover-item / hover-icon (light + dark)
 *   5. Buttons      — pill 按钮 + AlignUI Button 变体
 *   6. Pill Tabs    — shadcn 风格的胶囊 tabs
 *   7. Popover      — 全局 .popover / .popover-item / divider
 *   8. Dialog       — 标准 dialog + Alert dialog
 *   9. Chat Bubbles — 用户气泡 / AI 气泡 / 输入框
 *  10. TopNav       — 顶部导航语言
 *  11. Sidebar      — 侧边栏 / 会话项语言
 */
import { ReactNode, useEffect, useState } from 'react';

import {
  ArrowUp,
  Check,
  Copy,
  Folder,
  Image as ImageIcon,
  MessageSquarePlus,
  Mic,
  MoreHorizontal,
  Moon,
  Paperclip,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sun,
  Trash2,
  User,
  X,
} from 'lucide-react';

const cn = (...cls: Array<string | false | null | undefined>) =>
  cls.filter(Boolean).join(' ');

const Section = ({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: ReactNode;
}) => (
  <section id={id} className='scroll-mt-20 border-b border-[#ededed] py-10 dark:border-white/10'>
    <div className='mb-6'>
      <h2 className='text-[24px] font-semibold tracking-tight text-[#141414] dark:text-white'>
        {title}
      </h2>
      {desc && (
        <p className='mt-1 text-[14px] leading-5 text-[#6b7280] dark:text-[#9ca3af]'>{desc}</p>
      )}
    </div>
    {children}
  </section>
);

const Group = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className='mb-8'>
    <div className='mb-3 text-[12px] font-medium uppercase tracking-wider text-[#9ca3af]'>
      {label}
    </div>
    {children}
  </div>
);

const Swatch = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => (
  <div className='flex flex-col gap-1.5'>
    <div
      className='h-16 w-full rounded-[12px] border border-[#ededed] dark:border-white/10'
      style={{ background: value }}
    />
    <div className='flex items-baseline justify-between gap-2'>
      <span className='text-[13px] font-medium text-[#141414] dark:text-white'>{name}</span>
      <span className='font-mono text-[11px] text-[#6b7280] dark:text-[#9ca3af]'>{value}</span>
    </div>
  </div>
);

const RadiusCard = ({ name, value }: { name: string; value: string }) => (
  <div className='flex flex-col items-center gap-2'>
    <div
      className='flex h-20 w-20 items-center justify-center bg-[#F5F5F5] dark:bg-white/10'
      style={{ borderRadius: value }}>
      <span className='font-mono text-[12px] text-[#141414] dark:text-white'>{value}</span>
    </div>
    <span className='text-[12px] text-[#6b7280] dark:text-[#9ca3af]'>{name}</span>
  </div>
);

const App = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('dark', dark);
    return () => {
      document.body.classList.remove('dark');
    };
  }, [dark]);

  return (
    <div
      className={cn(
        'min-h-screen w-full transition-colors',
        dark ? 'bg-[#161618] text-white' : 'bg-white text-[#141414]',
      )}>
      <header className='sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#ededed] bg-white/80 px-6 backdrop-blur dark:border-white/10 dark:bg-[#161618]/80'>
        <div className='flex items-center gap-3'>
          <div className='font-mono text-[15px] font-semibold tracking-tight'>
            ui<span className='text-[#0081f2]'>·</span>lab
          </div>
          <span className='hidden text-[12px] text-[#6b7280] dark:text-[#9ca3af] sm:inline'>
            redesign/ui-v2 设计语言总览
          </span>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className='hover-icon'
          aria-label='Toggle dark mode'>
          {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
        </button>
      </header>

      <div className='mx-auto flex max-w-[1280px] gap-8 px-6 lg:px-10'>
        <nav className='sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[200px] shrink-0 overflow-y-auto py-8 lg:block'>
          <div className='mb-3 text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]'>
            Foundations
          </div>
          <TocLink href='#colors'>Colors</TocLink>
          <TocLink href='#typography'>Typography</TocLink>
          <TocLink href='#radius'>Radius</TocLink>
          <TocLink href='#shadow'>Shadow</TocLink>
          <TocLink href='#brand'>Brand & Logo</TocLink>
          <TocLink href='#icons'>Icons</TocLink>

          <div className='mb-3 mt-6 text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]'>
            Primitives
          </div>
          <TocLink href='#hover'>Hover</TocLink>
          <TocLink href='#buttons'>Buttons</TocLink>
          <TocLink href='#tabs'>Pill Tabs</TocLink>
          <TocLink href='#popover'>Popover</TocLink>
          <TocLink href='#dialog'>Dialog</TocLink>

          <div className='mb-3 mt-6 text-[11px] font-medium uppercase tracking-wider text-[#9ca3af]'>
            Patterns
          </div>
          <TocLink href='#bubbles'>Chat Bubbles</TocLink>
          <TocLink href='#input'>Chat Input</TocLink>
          <TocLink href='#topnav'>TopNav</TocLink>
          <TocLink href='#sidebar'>Sidebar</TocLink>
        </nav>

        <main className='min-w-0 flex-1 py-6'>
          <Intro />

          {/* 1. COLORS */}
          <Section
            id='colors'
            title='1. Colors'
            desc='全局收敛到「中性灰阶 + 单一品牌蓝」的极简色板。AI/用户消息文字统一为 #141414(不再用 rgba+opacity)。'>
            <Group label='Core / 中性'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6'>
                <Swatch name='Text Primary' value='#141414' />
                <Swatch name='Text Muted' value='#6b7280' />
                <Swatch name='Disabled' value='#9ca3af' />
                <Swatch name='Border' value='#ededed' />
                <Swatch name='Surface Hover' value='#F5F5F5' />
                <Swatch name='Card' value='#ffffff' />
              </div>
            </Group>

            <Group label='Brand / 强调'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                <Swatch name='Brand Blue' value='#0081f2' />
                <Swatch name='Primary Solid' value='#141414' />
                <Swatch name='Solid Hover' value='#2e2e2e' />
                <Swatch name='Error' value='#ef4444' />
              </div>
            </Group>

            <Group label='Dark Mode 适配'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6'>
                <Swatch name='BG Base' value='#161618' />
                <Swatch name='BG Card' value='#1E1E20' />
                <Swatch name='BG Tabs' value='#2a2a2c' />
                <Swatch name='BG Active' value='#3a3a3c' />
                <Swatch name='Border' value='rgba(255,255,255,0.2)' />
                <Swatch name='Hover' value='rgba(255,255,255,0.1)' />
              </div>
            </Group>
          </Section>

          {/* 2. TYPOGRAPHY */}
          <Section
            id='typography'
            title='2. Typography'
            desc='字体族:-apple-system / system-ui / Inter / PingFang SC。Markdown 区域 prose 统一文字颜色 #141414,h1 字号收敛到 30px。'>
            <Group label='字体族'>
              <div className='rounded-[12px] border border-[#ededed] bg-[#F5F5F5] p-5 font-mono text-[12px] dark:border-white/10 dark:bg-white/5'>
                -apple-system, system-ui, &apos;Helvetica Neue&apos;, &apos;PingFang SC&apos;,
                &apos;Microsoft Yahei&apos;, sans-serif
              </div>
            </Group>

            <Group label='字号阶梯'>
              <div className='space-y-3'>
                {[
                  { tag: 'h1 / prose h1', size: '30px', sample: 'AI 消息标题' },
                  { tag: 'dialog title', size: '17px', sample: '充值 / Charge' },
                  { tag: 'body', size: '14px', sample: '正文文字内容' },
                  { tag: 'description', size: '13px', sample: '次要描述说明' },
                  { tag: 'micro / chip', size: '11px', sample: 'CHIP / 赠送 ¥10' },
                ].map((row) => (
                  <div
                    key={row.tag}
                    className='flex items-baseline gap-4 border-b border-[#ededed] pb-2 dark:border-white/10'>
                    <span className='w-32 shrink-0 text-[12px] text-[#9ca3af]'>{row.tag}</span>
                    <span className='w-16 shrink-0 font-mono text-[11px] text-[#6b7280]'>
                      {row.size}
                    </span>
                    <span style={{ fontSize: row.size }} className='text-[#141414] dark:text-white'>
                      {row.sample}
                    </span>
                  </div>
                ))}
              </div>
            </Group>
          </Section>

          {/* 3. RADIUS */}
          <Section
            id='radius'
            title='3. Border Radius'
            desc='Pill / 全圆是这次改版的标志:所有 button、tabs、icon 按钮全部 rounded-full。Dialog 统一 20px,popover 16px。'>
            <div className='flex flex-wrap gap-6'>
              <RadiusCard name='hover-item' value='12px' />
              <RadiusCard name='popover' value='16px' />
              <RadiusCard name='dialog / input / bubble' value='20px' />
              <RadiusCard name='chat bubble multi' value='24px' />
              <RadiusCard name='charge dialog' value='28px' />
              <RadiusCard name='pill / icon btn' value='9999px' />
            </div>
          </Section>

          {/* 4. SHADOW */}
          <Section
            id='shadow'
            title='4. Shadow'
            desc='Pill tabs 选中态使用极轻的双层阴影;dialog 使用 shadcn 风格的 lg shadow(已从 shadow-xl 替换为原生 box-shadow 以避免 SSR 不一致)。'>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
              <ShadowCard
                name='Pill Tabs Active'
                shadow='0 2px 4px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(0,0,0,0.05)'
              />
              <ShadowCard name='Popover' shadow='0px 4px 16px -2px rgba(0,0,0,0.1)' />
              <ShadowCard
                name='Dialog'
                shadow='0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
              />
            </div>
          </Section>

          {/* 5. BRAND / LOGO */}
          <Section
            id='brand'
            title='5. Brand & Logo'
            desc='本次改版替换了浏览器 favicon 为 liaobots-logo,并新增三套 Logo 资源:图形 logo、文字 logo、文字+图形组合 logo。'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <LogoCard label='liaobots-logo.svg' subtitle='圆形品牌符号 / favicon'>
                <img
                  src='/liaobots-logo.svg'
                  alt='Liaobots'
                  width={64}
                  height={64}
                  className={dark ? 'invert' : ''}
                />
              </LogoCard>
              <LogoCard label='liaobots-text-logo.svg' subtitle='桌面端 TopNav 文字 logo'>
                <img
                  src='/liaobots-text-logo.svg'
                  alt='Liaobots'
                  width={180}
                  height={32}
                  className={dark ? 'invert' : ''}
                />
              </LogoCard>
              <LogoCard label='liaobots-full-logo.svg' subtitle='图形 + 文字 — 暗背景使用'>
                <div className='flex h-16 w-full items-center justify-center rounded-md bg-[#141414] px-4'>
                  <img src='/liaobots-full-logo.svg' alt='Liaobots' width={180} height={32} />
                </div>
              </LogoCard>
            </div>

            <Group label='Tab / Nav 图标'>
              <div className='flex flex-wrap gap-3'>
                {[
                  { src: '/tab-chat.png', label: 'Chat' },
                  { src: '/tab-draw.png', label: 'Draw' },
                  { src: '/tab-claw.png', label: 'OpenClaw' },
                  { src: '/icon-smallphone.png', label: 'Small Phone' },
                ].map((t) => (
                  <div
                    key={t.label}
                    className='flex w-[120px] flex-col items-center gap-2 rounded-[12px] border border-[#ededed] p-3 dark:border-white/10'>
                    <div className='relative flex h-12 w-12 items-center justify-center'>
                      <img
                        src={t.src}
                        alt={t.label}
                        className='h-full w-full object-contain'
                      />
                    </div>
                    <span className='text-[12px] text-[#6b7280] dark:text-[#9ca3af]'>
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </Group>
          </Section>

          {/* 6. ICONS */}
          <Section
            id='icons'
            title='6. Icons'
            desc='全站统一 Lucide React。三档规格:popover/header 16px / strokeWidth=2;工具栏 18-20px / strokeWidth=2.5;hover-icon 容器 36×36 圆形。'>
            <Group label='常用图标 (size=16, strokeWidth=2)'>
              <div className='flex flex-wrap gap-3 rounded-[12px] border border-[#ededed] p-4 dark:border-white/10'>
                {[
                  Plus,
                  MessageSquarePlus,
                  Settings,
                  Search,
                  Folder,
                  User,
                  Trash2,
                  Pencil,
                  Copy,
                  Check,
                  MoreHorizontal,
                  Paperclip,
                  ImageIcon,
                  Mic,
                  ArrowUp,
                  X,
                  RotateCcw,
                ].map((Icon, i) => (
                  <div
                    key={i}
                    className='flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#ededed] dark:border-white/10'>
                    <Icon size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
                  </div>
                ))}
              </div>
            </Group>

            <Group label='规格对照'>
              <div className='flex items-end gap-6'>
                {[
                  { size: 14, sw: 2, label: '14 / 2  (chip)' },
                  { size: 16, sw: 2, label: '16 / 2  (popover · header)' },
                  { size: 18, sw: 2, label: '18 / 2  (sidebar)' },
                  { size: 20, sw: 2.5, label: '20 / 2.5 (toolbar)' },
                  { size: 24, sw: 2, label: '24 / 2 (logo size)' },
                ].map((s) => (
                  <div key={s.label} className='flex flex-col items-center gap-2'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full border border-[#ededed] dark:border-white/10'>
                      <Settings
                        size={s.size}
                        strokeWidth={s.sw}
                        className='text-[#141414] dark:text-white'
                      />
                    </div>
                    <span className='text-[11px] text-[#6b7280] dark:text-[#9ca3af]'>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Group>
          </Section>

          {/* 7. HOVER */}
          <Section
            id='hover'
            title='7. Hover Primitives'
            desc='全局复用类:.hover-item(pill 形)、.hover-icon(圆形 36×36)。-dark 后缀变体用于深色背景上的浅色按钮。'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <HoverDemo bg='light' />
              <HoverDemo bg='dark' />
            </div>
          </Section>

          {/* 8. BUTTONS */}
          <Section
            id='buttons'
            title='8. Buttons'
            desc='全局所有按钮 rounded-full。Pill 按钮三件套:outline / solid / solid-error,作用于 dialog footer 与全站 CTA。'>
            <Group label='Pill Buttons (.btn-pill-outline / .btn-pill-solid)'>
              <div className='flex flex-wrap items-center gap-3'>
                <button className='btn-pill-outline'>取消</button>
                <button className='btn-pill-solid'>确认</button>
                <button className='btn-pill-solid-error'>删除</button>
                <button className='btn-pill-outline' disabled style={{ opacity: 0.5 }}>
                  Disabled
                </button>
              </div>
            </Group>

            <Group label='含图标按钮'>
              <div className='flex flex-wrap items-center gap-3'>
                <button className='btn-pill-solid flex items-center gap-2'>
                  <Plus size={14} strokeWidth={2} />
                  新建会话
                </button>
                <button className='btn-pill-outline flex items-center gap-2'>
                  <Copy size={14} strokeWidth={2} />
                  复制
                </button>
                <button className='btn-pill-solid-error flex items-center gap-2'>
                  <Trash2 size={14} strokeWidth={2} />
                  删除
                </button>
              </div>
            </Group>

            <Group label='发送按钮 (圆形, 黑底白字, 24px icon)'>
              <button className='flex h-10 w-10 items-center justify-center rounded-full bg-[#141414] text-white transition-colors hover:bg-[#2e2e2e] dark:bg-white dark:text-[#141414] dark:hover:bg-white/90'>
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            </Group>
          </Section>

          {/* 9. PILL TABS */}
          <Section
            id='tabs'
            title='9. Pill Tabs'
            desc='shadcn 风格胶囊 tabs,全站收敛到 .pill-tabs / .pill-tabs-item。选中态使用 0.5px ring + 2px 阴影;深色模式下背景调亮(避免比容器更暗)。'>
            <PillTabsDemo />
          </Section>

          {/* 10. POPOVER */}
          <Section
            id='popover'
            title='10. Popover'
            desc='全局 .popover 容器(rounded-16, padding-6, border + 4/16 阴影)+ .popover-item(rounded-8, gap-12, hover #F5F5F5)+ .popover-divider。图标必须 size=16 strokeWidth=2。'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <PopoverDemo />
              <PopoverDemo variant='settings' />
            </div>
          </Section>

          {/* 11. DIALOG */}
          <Section
            id='dialog'
            title='11. Dialog'
            desc='两类:标准 dialog (rounded-20, header/body/footer) + Alert dialog (icon + title + description, 简洁版)。dialog-close 使用 hover-icon 复用类。'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <StandardDialogDemo />
              <AlertDialogDemo />
            </div>
          </Section>

          {/* 12. CHAT BUBBLES */}
          <Section
            id='bubbles'
            title='12. Chat Bubbles'
            desc='用户气泡 #F5F5F5 + 1px 描边 + 动态圆角(单/多行不同);AI 气泡白底 + 边框 + 20px 圆角;prose 文字统一 #141414。'>
            <div className='space-y-4 rounded-[16px] border border-[#ededed] bg-white p-6 dark:border-white/10 dark:bg-[#1E1E20]'>
              <div className='flex items-start gap-3'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#141414] text-[12px] font-medium text-white dark:bg-white dark:text-[#141414]'>
                  AI
                </div>
                <div className='max-w-[70%] rounded-[20px] border border-[#ededed] bg-white px-7 py-6 text-[14px] leading-relaxed text-[#141414] dark:border-white/10 dark:bg-[#2a2a2c] dark:text-white'>
                  这是一段 AI 回复。气泡使用白色背景 + 1px 边框 + 20px 圆角,
                  左右内边距 28px、上下 24px,prose 文字颜色覆盖到 #141414。
                </div>
              </div>

              <div className='flex justify-end'>
                <div className='max-w-[70%] rounded-full border border-[#e8e8e8] bg-[#F5F5F5] px-5 py-2.5 text-[14px] text-[#141414] dark:border-white/10 dark:bg-white/10 dark:text-white'>
                  单行用户消息
                </div>
              </div>

              <div className='flex justify-end'>
                <div className='max-w-[70%] rounded-[24px] border border-[#e8e8e8] bg-[#F5F5F5] px-5 py-3 text-[14px] leading-relaxed text-[#141414] dark:border-white/10 dark:bg-white/10 dark:text-white'>
                  多行用户消息会切换为更大的圆角(24px),
                  避免单行 pill 形态在文本变长后挤成"巨型胶囊"。
                </div>
              </div>
            </div>
          </Section>

          {/* 13. CHAT INPUT */}
          <Section
            id='input'
            title='13. Chat Input'
            desc='输入框背景 #F5F5F5、20px 圆角;图标按钮换为 Lucide;右下角发送按钮黑底白箭头;移动端固定在底部 8px。'>
            <div className='rounded-[24px] border border-[#ededed] bg-white p-6 dark:border-white/10 dark:bg-[#1E1E20]'>
              <div className='rounded-[20px] bg-[#F5F5F5] p-4 dark:bg-white/5'>
                <div className='mb-3 text-[14px] text-[#6b7280] dark:text-[#9ca3af]'>
                  给 LiaoBots 发送消息…
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <button className='hover-icon'>
                      <Plus size={18} strokeWidth={2} />
                    </button>
                    <button className='hover-icon'>
                      <ImageIcon size={18} strokeWidth={2} />
                    </button>
                    <button className='hover-icon'>
                      <Paperclip size={18} strokeWidth={2} />
                    </button>
                  </div>
                  <button className='flex h-9 w-9 items-center justify-center rounded-full bg-[#141414] text-white transition-colors hover:bg-[#2e2e2e] dark:bg-white dark:text-[#141414]'>
                    <ArrowUp size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* 14. TOPNAV */}
          <Section
            id='topnav'
            title='14. TopNav'
            desc='Logo (h-24px) 紧邻左侧导航,间距 36px;导航纯文字 + active 显示纯白色,无 hover 背景;右侧按钮统一 hover 样式。'>
            <TopNavDemo />
          </Section>

          {/* 15. SIDEBAR */}
          <Section
            id='sidebar'
            title='15. Sidebar'
            desc='会话项 2px 间距、统一 hover 风格;图标统一 Lucide + #141414;文件夹标题 36px 缩进;搜索框字重 500。'>
            <SidebarDemo />
          </Section>

          <footer className='py-12 text-center text-[12px] text-[#9ca3af]'>
            UI Lab · 基于 redesign/ui-v2 分支 · 数据来源:master..redesign/ui-v2 (200+ commits)
          </footer>
        </main>
      </div>
    </div>
  );
};

const TocLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className='block rounded-[8px] px-3 py-1.5 text-[13px] text-[#535350] transition-colors hover:bg-[#F5F5F5] hover:text-[#141414] dark:text-[#9ca3af] dark:hover:bg-white/10 dark:hover:text-white'>
    {children}
  </a>
);

const Intro = () => (
  <section className='py-10'>
    <div className='inline-block rounded-full border border-[#ededed] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#6b7280] dark:border-white/10 dark:text-[#9ca3af]'>
      Liaobots · redesign/ui-v2
    </div>
    <h1 className='mt-4 text-[40px] font-semibold leading-tight tracking-tight text-[#141414] dark:text-white'>
      统一的设计语言总览
    </h1>
    <p className='mt-3 max-w-[640px] text-[15px] leading-relaxed text-[#535350] dark:text-[#9ca3af]'>
      这个页面把 redesign/ui-v2 分支累计 200+ 个提交里涉及到的设计改动 ——
      颜色、字体、圆角、阴影、Logo、图标、按钮、Popover、Dialog、聊天气泡、TopNav、Sidebar
      —— 集中展示在一起,方便 review、对齐、对比 master。
    </p>
  </section>
);

const ShadowCard = ({ name, shadow }: { name: string; shadow: string }) => (
  <div className='flex flex-col gap-2'>
    <div
      className='h-24 w-full rounded-[16px] bg-white dark:bg-[#1E1E20]'
      style={{ boxShadow: shadow }}
    />
    <div className='text-[13px] font-medium text-[#141414] dark:text-white'>{name}</div>
    <div className='font-mono text-[10px] leading-tight text-[#6b7280] dark:text-[#9ca3af]'>
      {shadow}
    </div>
  </div>
);

const LogoCard = ({
  label,
  subtitle,
  children,
}: {
  label: string;
  subtitle: string;
  children: ReactNode;
}) => (
  <div className='flex flex-col gap-3 rounded-[16px] border border-[#ededed] p-5 dark:border-white/10'>
    <div className='flex h-20 items-center justify-center'>{children}</div>
    <div>
      <div className='font-mono text-[12px] text-[#141414] dark:text-white'>{label}</div>
      <div className='text-[11px] text-[#6b7280] dark:text-[#9ca3af]'>{subtitle}</div>
    </div>
  </div>
);

const HoverDemo = ({ bg }: { bg: 'light' | 'dark' }) => {
  const isDark = bg === 'dark';
  return (
    <div
      className={cn(
        'rounded-[16px] p-6',
        isDark ? 'bg-[#141414]' : 'bg-[#F5F5F5] dark:bg-white/5',
      )}>
      <div
        className={cn(
          'mb-3 text-[12px]',
          isDark ? 'text-white/70' : 'text-[#6b7280] dark:text-[#9ca3af]',
        )}>
        {isDark ? '.hover-item-dark / .hover-icon-dark' : '.hover-item / .hover-icon'}
      </div>
      <div className='flex items-center gap-2'>
        <button
          className={cn(
            'flex items-center gap-2 text-[14px]',
            isDark ? 'hover-item-dark text-white' : 'hover-item',
          )}>
          <Folder size={16} strokeWidth={2} />
          菜单项
        </button>
        <button className={isDark ? 'hover-icon-dark text-white' : 'hover-icon'}>
          <Settings size={16} strokeWidth={2} />
        </button>
        <button className={isDark ? 'hover-icon-dark text-white' : 'hover-icon'}>
          <MoreHorizontal size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

const PillTabsDemo = () => {
  const [active, setActive] = useState(0);
  const items = ['Chat', 'Draw', 'OpenClaw', 'Small Phone'];
  return (
    <div className='space-y-4'>
      <div className='pill-tabs'>
        {items.map((t, i) => (
          <div
            key={t}
            onClick={() => setActive(i)}
            className={cn('pill-tabs-item', i === active && 'pill-tabs-item--active')}>
            {t}
          </div>
        ))}
      </div>
      <div className='pill-tabs'>
        <div className='pill-tabs-item pill-tabs-item--active'>主站</div>
        <div className='pill-tabs-item'>镜像站</div>
      </div>
    </div>
  );
};

const PopoverDemo = ({ variant = 'menu' }: { variant?: 'menu' | 'settings' }) => (
  <div className='flex justify-center rounded-[16px] border border-dashed border-[#ededed] py-10 dark:border-white/10'>
    <div className='popover w-[240px]'>
      {variant === 'menu' ? (
        <>
          <button className='popover-item'>
            <Pencil size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
            重命名
          </button>
          <button className='popover-item'>
            <Copy size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
            复制链接
          </button>
          <div className='popover-divider' />
          <button className='popover-item text-[#ef4444]'>
            <Trash2 size={16} strokeWidth={2} className='text-[#ef4444]' />
            删除会话
          </button>
        </>
      ) : (
        <>
          <button className='popover-item'>
            <User size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
            个人信息
          </button>
          <button className='popover-item'>
            <Settings size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
            设置
          </button>
          <button className='popover-item'>
            <Moon size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
            外观
          </button>
          <div className='popover-divider' />
          <button className='popover-item'>
            <X size={16} strokeWidth={2} className='text-[#141414] dark:text-white' />
            退出登录
          </button>
        </>
      )}
    </div>
  </div>
);

const StandardDialogDemo = () => (
  <div className='dialog-overlay !static !bg-transparent !p-0'>
    <div className='dialog max-w-[400px]'>
      <div className='dialog-title'>标准 Dialog</div>
      <div className='dialog-body'>
        <p className='text-[14px] leading-relaxed text-[#141414] dark:text-white'>
          这是 dialog 的内容区。padding 20px、与 header / footer 通过 1px 灰色分割线分隔。
        </p>
        <div className='mt-4 rounded-[12px] bg-[#F5F5F5] p-3 text-[13px] text-[#6b7280] dark:bg-white/5 dark:text-[#9ca3af]'>
          可放置表单、说明、列表等任意内容。
        </div>
      </div>
      <div className='dialog-footer'>
        <button className='btn-pill-outline'>取消</button>
        <button className='btn-pill-solid'>确认</button>
      </div>
      <button className='dialog-close'>
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  </div>
);

const AlertDialogDemo = () => (
  <div className='dialog-overlay !static !bg-transparent !p-0'>
    <div className='dialog max-w-[400px]'>
      <div className='alert-dialog-body'>
        <div className='alert-dialog-header'>
          <Trash2 className='alert-dialog-icon-error' strokeWidth={2} />
          <span className='alert-dialog-title'>删除会话?</span>
        </div>
        <p className='alert-dialog-description'>
          删除后无法恢复,所有消息记录将永久消失。
        </p>
      </div>
      <div className='alert-dialog-footer'>
        <button className='btn-pill-outline'>取消</button>
        <button className='btn-pill-solid-error'>删除</button>
      </div>
      <button className='dialog-close'>
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  </div>
);

const TopNavDemo = () => (
  <div className='overflow-hidden rounded-[16px] border border-[#ededed] dark:border-white/10'>
    <div className='flex h-11 items-center justify-between border-b border-[#ededed] bg-white px-5 dark:border-white/10 dark:bg-[#161618]'>
      <div className='flex items-center gap-9'>
        <img
          src='/liaobots-text-logo.svg'
          alt='Liaobots'
          width={120}
          height={20}
          className={'opacity-90'}
        />
        <nav className='flex items-center gap-6 text-[14px] font-medium'>
          <span className='text-[#141414] dark:text-white'>Chat</span>
          <span className='text-[#9ca3af]'>Draw</span>
          <span className='text-[#9ca3af]'>OpenClaw</span>
        </nav>
      </div>
      <div className='flex items-center gap-1'>
        <button className='hover-icon'>
          <Search size={16} strokeWidth={2} />
        </button>
        <button className='hover-icon'>
          <User size={16} strokeWidth={2} />
        </button>
      </div>
    </div>

    <div className='flex h-12 items-center justify-between bg-white px-3 dark:bg-[#161618]'>
      <button className='hover-icon'>
        <Settings size={18} strokeWidth={2} />
      </button>
      <div className='pill-tabs scale-90'>
        <div className='pill-tabs-item pill-tabs-item--active'>Chat</div>
        <div className='pill-tabs-item'>Draw</div>
        <div className='pill-tabs-item'>Phone</div>
      </div>
      <button className='hover-icon'>
        <User size={18} strokeWidth={2} />
      </button>
    </div>
  </div>
);

const SidebarDemo = () => (
  <div className='flex h-[420px] overflow-hidden rounded-[16px] border border-[#ededed] dark:border-white/10'>
    <aside className='flex w-[260px] flex-col border-r border-[#ededed] bg-white p-3 dark:border-white/10 dark:bg-[#161618]'>
      <button className='btn-pill-solid mb-3 w-full justify-center'>
        <span className='flex items-center gap-2'>
          <MessageSquarePlus size={16} strokeWidth={2} />
          新建聊天
        </span>
      </button>

      <div className='relative mb-3'>
        <Search
          size={14}
          strokeWidth={2}
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]'
        />
        <input
          placeholder='搜索会话'
          className='h-9 w-full rounded-[12px] bg-[#F5F5F5] pl-9 pr-3 text-[14px] font-medium text-[#141414] outline-none dark:bg-white/5 dark:text-white'
        />
      </div>

      <div className='flex flex-col gap-0.5'>
        {[
          { title: '关于 redesign/ui-v2 的总览', active: true },
          { title: '设计 token 整理', active: false },
          { title: 'AI 消息颜色统一', active: false },
          { title: '充值 dialog 改版', active: false },
        ].map((item, i) => (
          <div
            key={i}
            className={cn(
              'group flex cursor-pointer items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#141414] transition-colors dark:text-white',
              item.active
                ? 'bg-[#F5F5F5] dark:bg-white/10'
                : 'hover:bg-[#F5F5F5] dark:hover:bg-white/10',
            )}>
            <span className='truncate'>{item.title}</span>
            <button className='opacity-0 group-hover:opacity-100'>
              <MoreHorizontal size={14} strokeWidth={2} className='text-[#6b7280]' />
            </button>
          </div>
        ))}

        <div className='mt-4 pl-9 text-[12px] font-medium text-[#9ca3af]'>文件夹</div>
        <div className='flex items-center gap-2 rounded-[8px] px-3 py-2 text-[14px] text-[#141414] hover:bg-[#F5F5F5] dark:text-white dark:hover:bg-white/10'>
          <Folder size={16} strokeWidth={2} />
          工作
        </div>
      </div>
    </aside>

    <div className='flex-1 bg-[#F5F5F5] p-6 text-[12px] text-[#9ca3af] dark:bg-[#1E1E20]'>
      Sidebar 预览区
    </div>
  </div>
);

export default App;
