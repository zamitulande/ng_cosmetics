
export const getPalette = (name) => {
  switch (name) {
    case "green":
      return {
        primary: {
          main: "#ff0000"
        },
        secondary: {
          main: "#ff0000"
        }
      }
    case "pink":
      return {
        primary: {
          main: "#EDBCC8"
        },
        secondary: {
          main: "#ff0000"
        }
      }
  }
}

const getTheme = (name) => {
  switch (name) {
    case "pink":
      return {
        palette: getPalette(name),
        typography: {
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 200,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 200,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        }
      }
    case "kit_skincare":
      return {
        palette: getPalette(name),
        typography: {
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 200,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 200,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
        }
      }
    default:
      return {};
  }
};

export default getTheme;