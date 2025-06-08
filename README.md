# GH Replicate

### Known Bugs

1. **Unexpected Markdown Conversion**

    - There are a few Markdown elements in fetched GH releases that aren't being converted as expected such as summary/details tags, etc.
    - Fix visuals bugs caused by faulty indentation conversions.

2. **Performance Lag**

    - Text input updating is slow after initial form submission.
        - Which can cause an intentional error if the get text input state variable is not up-to-date on form submission.
    - Theme toggling after initial form submission is slow.
      (Solutions for both of these issues may involve utilizing useRef() and/or useMemo().)

### Planned Features

-   **UI**
    -   Port homepage title/theme toggler to components to be accessible on 404 page.
    -   Get access token.
    -   Port theme toggle button to use an icon.
    -   Improve form label states.
    -   Implement form submission check if offline and if so display an appropriate message.
    -   Hyperlink icon near GH release title.
    -   Improve GH release date format/system.
    -   GH release commit hash link.
    -   Implement summary & details tags for GH release asset body (Create Expo Go has good examples).
    -   Loading Indicator:
        -   initial
        -   releases
    -   Port current UI to use third-party component libraries (e.g. Shadcn UI).
-   **Session/Local Storage**
    -   Remember last used theme type.
    -   Remember last fetched GH releases.
-   **TailwindCSS/Nativewind**
    -   Implement smooth transitions on theme toggle.
    -   Migrate color/style variables to custom TailwindCSS color variables.
-   **RN Screen Functionality**
    -   Individual GH release.
    -   All GH releases.
-   **Mobile Support**
    -   Back button.
    -   Landscape mode.

### Progress Since Last Term

-   **Before Midterm**

    -   Ported:
        -   All styles to use TailwindCSS via Nativewind.
    -   -   Previous [buggy] automatic theme detection to theme toggle button.
    -   Updated/Improved:
        -   Overall theme, including font and colors.
        -   Form field placeholder text.

-   **After Midterm**
    -   New Component - Ported form field inputs to a component.
    -   Bug Fixed:
        -   GH release tag icon not being a link.
        -   Latest GH release badge not showing even for latest GH release.
        -   Markdown body not converting several links properly.
        -   Missing hover effects for links.
        -   Incorrect [underline] default styling for GH release links.
        -   TouchableOpacity component and onPress events not firing after updating to latest Expo Go versions when in other screens.
    -   Added hover effect for GH release title (replace w/ icon in future) and badge.
    -   Updated/Improved - Overall theme, including font and colors.
    -   Updated/Improved - Boundaries (breakpoints, padding, margin, etc.).
    -   Updated/Improved - Responsive breakpoints.
    -   Mysteriously somehow fixed GH releases throwing "key" errors if releases contained list items.
