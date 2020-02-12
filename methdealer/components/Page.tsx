import React from 'react';
import { Search20, Notification20, AppSwitcher20 } from '@carbon/icons-react';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderContainer,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  Content
} from 'carbon-components-react'
import { GTTopics } from '../types/calculator';
import cx from 'classnames'

const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true">
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);

export function Page(props: { children?: React.ReactNode, topics?: GTTopics, difficulty: "a" | "e"; health: boolean }) {
  if (!props.health) {
    return null
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Meth Dealer">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="Meth">
                Dealer
              </HeaderName>
              <HeaderNavigation aria-label="Meth Dealer">
                <HeaderMenuItem href="/a">A-Math</HeaderMenuItem>
                <HeaderMenuItem href="/e">E-Math</HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Search"
                  onClick={() => alert('search click')}>
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="App Switcher"
                  onClick={() => alert('app-switcher click')}>
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}>
                <SideNavItems>
                  <HeaderSideNavItems hasDivider={true}>
                    <HeaderMenuItem linkRole="link" href="/a">
                      A-Math
                    </HeaderMenuItem>
                    <HeaderMenuItem linkRole="link" href="/e">
                      E-Math
                    </HeaderMenuItem>
                  </HeaderSideNavItems>
                  {Object.keys(props.topics).map((topic) => {
                    return (
                      <SideNavMenu renderIcon={Fade16} title={topic}>
                        {props.topics[topic].map((eqns) => {
                          return (
                            <SideNavMenuItem href={"/" + props.difficulty + "/" + eqns.id}>
                              {eqns.title}
                            </SideNavMenuItem>
                          )
                        })}
                      </SideNavMenu>
                    )
                  })}
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
      <div className={'bx--offset-lg-3'} style={{
        display: 'flex',
        flex: 1,
        marginTop: 48
      }}>
        {props.children}
      </div>
    </div>
  )
}