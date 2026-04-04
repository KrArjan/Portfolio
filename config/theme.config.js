/* ============================================================
   theme.config.js — Your Portfolio Design System
   ============================================================
   
   🟢 THIS FILE CONTROLS ALL COLORS, FONTS, AND DESIGN TOKENS.
   
   Change any HEX code below to update your entire portfolio.
   No CSS editing required.
   ============================================================ */

'use strict';

const THEME_CONFIG = {

  /* ===================== COLORS ===================== *
   * Custom palettes: Emerald, Sunset, Midnight, etc.
   * ================================================ */
  colors: {
    // === Surface (Backgrounds) ===
    surface_dim:     "#131313",  // Main background
    surface_low:     "#1c1b1b",  // Cards / Section backgrounds
    surface_high:    "#2a2a2a",  // Elevated elements
    on_surface:      "#e5e2e1",  // Primary text color
    on_surface_dim:  "#b9cacb",  // De-emphasized text

    // === Primary Accent (Default: Cyan) ===
    primary:         "#00f2ff",  // Main accent color
    primary_fixed:   "#74f5ff",  // Bright accent variant
    on_primary:      "#00363a",  // Text color on primary background

    // === Secondary Accent (Default: Purple) ===
    secondary:       "#dcb8ff",  // Secondary brand color
    secondary_fixed: "#efdbff",  // Bright secondary variant
    on_secondary:    "#480081",  // Text color on secondary

    // === Tertiary Accent (Default: Amber) ===
    tertiary:        "#fff6e4",  // Third brand color
    tertiary_fixed:  "#ffe173",  // Bright tertiary variant
    on_tertiary:     "#3b2f00",  // Text color on tertiary
  },

  /* ===================== TYPOGRAPHY ===================== */
  fonts: {
    headline: "'Space Grotesk', sans-serif",
    body:     "'Manrope', sans-serif",
  },

  /* ===================== UI STYLE ===================== */
  rounding: {
    base:   "4px",   // Default corner rounding
    large:  "8px",   // Cards and large components
    full:   "999px", // Pills and circles
  }
};
