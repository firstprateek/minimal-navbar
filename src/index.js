/**
 * @license
 * Copyright 2023 firstprateek
 * ISC License
 */

import { LitElement, html, css } from "lit";
import { classMap } from 'lit/directives/class-map.js';
import './hamburger-btn.js';

/**
 * MinimalNavbar widget: <minimal-navbar></minimal-navbar>.
 * 
 * A simple yet powerful Navigation Bar web-component that can be added to your website to navigate between web pages.
 * The widget is:
 * 
 * 1) Responsive - You can set a width in pixels using the breakpoint property. When the viewport width is below the breakpoint, the navbar changes to a mobile version.
 * 2) Themable - You can use css variables to set the theme colors for the widget. See the list of css variables below.
 * 3) Light-weight and Performant - Built using the LIT framework.
 * 
 * @property breakpoint {Number} - The width in pixels below which the Navbar displays in mobile mode.
 *
 * @slot brand - A link to the brand of the website
 * @slot link - Navigation links
 *  
 * @fires activeLinkChanged - Fired when a link is selected
 *
 * @cssproperty --hamburger-stripe-color - Color of the stripes in the hamburger menu
 * @cssproperty --navbar-shadow - Box shadow for the Navbar, default: 0 1px 2px rgb(0 0 0 / 50%)
 * @cssproperty --navbar-height - Height of the Navbar, default: 75px
 * @cssproperty --navbar-font-size - Font size of the Navbar, default: 16px
 * @cssproperty --navbar-font-family - Font family of the Navbar, default: "Exo 2", sans-serif
 * @cssproperty --navbar-bg-color - Background color of the Navbar, default: #FFFFFF
 * @cssproperty --navbar-menu-color - Background color of the links, default: #FFFFFF
 * @cssproperty --navbar-link-color - Color of the links, default: #58595B
 * @cssproperty --navbar-highlight-color - Color of the title and links, default: #E65446
 * @cssproperty --navbar-link-active-color - Color of the links, default: #333333
 * 
 */

export class MinimalNavbar extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      width: 100%;
      position: relative;
      display: block;
      top: 0;
      z-index: 99;
      box-shadow: var(--navbar-shadow, 0 1px 2px rgb(0 0 0 / 50%));
      height: var(--navbar-height, 75px);
      font-size: var(--navbar-font-size, 16px);
      font-family: var(--navbar-font-family, "Exo 2", sans-serif);
    }

    header {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 1fr auto;
    }

    header:not(.mobile) {
      overflow: hidden;
    }

    header div {
      width: 100%;
      z-index: 99;
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: auto auto;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      background-color: var(--navbar-bg-color, #FFFFFF);
    }

    header nav {
      width: 100%;
      position: absolute;
      display: grid;
      padding: 1rem 0;
      background-color: var(--navbar-menu-color, #FFFFFF);
    }

    header:has(nav.show) {
      box-shadow: none;
    }

    header.mobile nav {
      display: grid;
      grid-auto-rows: 100px;
      padding: 0;
      height: calc(100vh - var(--navbar-height, 75px));
    }

    header.mobile nav.show {
      box-shadow: 0 1rem 3rem rgba(0,0,0,0.175);
    }

    header:not(.mobile) nav {
      align-items: center;
      grid-auto-flow: column;
      justify-content: flex-end;
      padding: 0 0.5rem 0 0;
      position: relative;
      z-index: unset;
    }
    header:not(.mobile) nav a {
      padding: 0 1rem;
    }

    ::slotted(a) {
      color: var(--navbar-link-color, #58595B);
      padding: 0 0.5rem;
      text-decoration: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    ::slotted(a:hover) {
      opacity: 0.75;
    }

    ::slotted(a.active.isMobile) {
      border-left: 2px solid var(--navbar-highlight-color, #E65446);
    }

    ::slotted(a.isMobile) {
      border-left: 2px solid transparent;
    }

    ::slotted(a.active:not(.isMobile)) {
      border-bottom: 2px solid var(--navbar-highlight-color, #E65446);
      border-top: 2px solid transparent;
    }

    .logo::slotted(a) {
      color: var(--navbar-highlight-color, #E65446);
      font-size: 2em;
      max-height: 100px;
      padding: 0;
      text-decoration: none;
      cursor: default;
      user-select: none;
    }

    .logo::slotted(a:hover) {
        opacity: 1;
    }

    .logo::slotted(a:hover) {
      color: var(--navbar-highlight-color, #E65446);
    }

    .animate {
      transition: all 0.4s ease-in-out !important;
    }

    ::slotted(.nav-link--active) {
      color: var(--navbar-link-active-color, #333333) !important;
    }
`;

  static properties = {
    breakpoint: { type: Number },
    brandPlacement: { type: String },
    isMobile: { type: Boolean, state: true },
    drawerOpen: { type: Boolean, state: true },
    activeLink: { type: String, state: true }
  }

  constructor() {
    super();
    
    this.breakpoint = 500;
    this.brandPlacement = 'left';
    this.isMobile = false;
    this.drawerOpen = false;
    this.activeLink = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.windowSizeChangeHandler(); // Compute the isMobile property at launch
    this._windowSizeChangeHandler = this.windowSizeChangeHandler;
    window.addEventListener('resize', this._windowSizeChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this._windowSizeChangeHandler);
  }

  updated() {
    // After the dom is updated, set the styles of the navbar
    let navYdistance = 0;
    let navXdistance = 0;

    if (this.nav) {
        if (this.isMobile) {
            navYdistance = this.headerHeight;
            navXdistance = this.drawerOpen ? 30 : 100;
            this.nav.style.transform = `translateY(${navYdistance}) translateX(${navXdistance}%)`;
            setTimeout(() => {this.nav.classList.add('animate');}, 0);
        } else {
            this.nav.style.transform = `translateY(${navYdistance}px)`;
            this.nav.classList.remove('animate');
        }
    }

    if (this.links) {
        this.links.forEach(link => {
            if (link.textContent.toLowerCase().trim() === this.activeLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }

            if (this.isMobile) {
                link.classList.add('isMobile');
            } else {
                link.classList.remove('isMobile');
            }
        })
    }

    if (!this.drawerOpen) {
        this.button.open = false;
    }
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('isMobile') && !this.isMobile) {
        this.drawerOpen = false;
    }
  }

  brandTemplate() {
    return html`
      <div>
        <slot name="brand" class="logo"></slot>
        <hamburger-btn 
          ?hidden=${!this.isMobile}
          @click=${() => this.drawerOpen = !this.drawerOpen}
        >
        </hamburger-btn>
      </div>`;
  }

  navTemplate() {
    return html`
      <nav 
        class=${classMap({ show: this.isMobile && this.drawerOpen })} 
        @click=${this.handleLinkClick}
      >
        <slot name="link"></slot>
      </nav>
    `;
  }

  render() {
    return html`
      <header class=${ this.isMobile && 'mobile' }>
        ${ this.brandPlacement === 'left' ? this.brandTemplate() : html`` }
        ${ this.navTemplate() }
        ${ this.brandPlacement === 'right' ? this.brandTemplate() : html`` }              
      </header>
    `;
  }

  // Event handlers
  windowSizeChangeHandler = () => {
    this.isMobile = window.innerWidth <= this.breakpoint;
  }

  handleLinkClick = (e) => {
    if (e.target.tagName !== 'A') {
        return;
    }

    this.activeLink = e.target.textContent.toLowerCase().trim();

    this.drawerOpen = false;

    const options = {
        detail: { active: this.activeLink },
        bubbles: true,
        composed: true
    };

    this.dispatchEvent(new CustomEvent('activeLinkChanged', options));
}

  // Helper Methods
  get header() {
    return this.renderRoot?.querySelector('header') ?? null;
  }

  get div() {
    return this.header?.querySelector('div') ?? null;
  }

  get button() {
    return this.header?.querySelector('hamburger-btn') ?? null;
  }

  get nav() {
    return this.header?.querySelector('nav') ?? null;
  }

  get links() {
    const linkSlot = this.renderRoot?.querySelector('slot[name="link"]');
    return linkSlot.assignedElements();
  }

  get headerHeight() {
    return `${(this.header?.getBoundingClientRect()?.height || 75) + 2}px`;
  }
}

customElements.define('minimal-navbar', MinimalNavbar);
