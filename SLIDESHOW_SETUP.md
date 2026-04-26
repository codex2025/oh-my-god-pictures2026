# Hero Slideshow Setup Guide

## Overview
The homepage now features a professional slideshow carousel that appears after the hero video plays for 5 seconds. It works similar to Amazon Prime Video's carousel style with auto-rotation and manual controls.

## How It Works
1. **Video plays** - Hero video plays at the top of homepage
2. **After 5 seconds** - Slideshow automatically fades in and video disappears
3. **Auto-rotation** - Images cycle through every 5 seconds
4. **Manual controls** - Users can click "Previous" or "Next" to navigate manually

## Required PNG Images
You need to add **4 PNG images** to the `images/` folder:

| Filename | Purpose | Recommended Size |
|----------|---------|-----------------|
| `slide-1.png` | First promotional image | 1200x675px (16:9 aspect ratio) |
| `slide-2.png` | Second promotional image | 1200x675px |
| `slide-3.png` | Third promotional image | 1200x675px |
| `slide-4.png` | Fourth promotional image | 1200x675px |

## Adding Your Images

### Option 1: Using Your Own Images
Simply add your 4 PNG files to the `images/` folder with these exact names:
- `slide-1.png`
- `slide-2.png`
- `slide-3.png`
- `slide-4.png`

### Option 2: Quick Test with Placeholder Generator
If you need temporary placeholders to test, you can use any of these online tools to create 1200x675 PNG images:
- Photoshop or GIMP (free)
- Canva.com
- Online PNG generators

## Image Best Practices
- **Format**: PNG (or JPG)
- **Aspect Ratio**: 16:9 (1200x675px recommended)
- **Size**: Keep under 500KB per image for fast loading
- **Content**: Promotional images, product shots, hero images work best
- **Quality**: High resolution (1200px width minimum)

## Features Implemented
✅ Auto-rotation every 5 seconds  
✅ Manual navigation (Previous/Next buttons)  
✅ Smooth fade transitions (0.7s)  
✅ Prime Video-style carousel  
✅ Fully responsive design  
✅ No blank space between transitions  
✅ Auto-rotation resets when buttons are clicked  

## Customization
If you want to adjust timing or styling:

**In `script.js`:**
- `SLIDE_DURATION = 5000` → Change to rotate every X milliseconds
- `SLIDE_TRANSITION = 700` → Fade transition speed in milliseconds

**In `styles.css`:**
- `.slideshow-slide { transition: opacity 0.7s ease-in-out; }` → Adjust fade speed
- `.slideshow { aspect-ratio: 16 / 9; }` → Change image aspect ratio

## Troubleshooting

**Images not showing?**
- Check that PNG files are in `/images/` folder
- Verify filenames match exactly: `slide-1.png`, `slide-2.png`, etc.
- Check browser console for 404 errors

**Slideshow not appearing after 5 seconds?**
- Ensure video is playing with sound muted
- Check that JavaScript is enabled
- Verify no console errors in browser DevTools

**Images not fitting properly?**
- Make sure images are 16:9 aspect ratio (1200x675px)
- Check CSS for `.slideshow` aspect-ratio setting
