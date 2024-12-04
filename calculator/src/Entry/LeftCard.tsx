import { Svg } from "../ui/Svg";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { Box, BoxDecoration } from "../ui/Box";
import { Text, TextDecoration } from "../ui/Text";
import { Image, ImageDecoration } from "../ui/Image";

export function LeftCard(): JSX.Element {
  const { gte, range } = useBreakpoints();

  return (
    <Box
      width={gte(680) ? ".5fr" : "fill"}
      height="fill"
      vertical
      spacing={range(525, 680) || gte(975) ? 3.125 : 1.75}
      padding={
        range(525, 680) || gte(975)
          ? [6.25, 2.5, 2.5]
          : range(475, 525) || range(750, 975)
            ? [4, 1, 1]
            : [3, 1, 1]
      }
      behindContent={
        <Svg
          width="fill"
          height="fill"
          viewBox="0 0 640 528"
          preserveAspectRatio="none"
        >
          <g clipPath="url(#clip0_51293_76934)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M432.971 7.02944C437.471 2.52856 443.576 0 449.941 0H616C629.255 0 640 10.7452 640 24V32V259.543V504C640 517.255 629.255 528 616 528H445.353H24C10.7452 528 0 517.255 0 504V56C0 42.7452 10.7452 32 24 32H398.059C404.424 32 410.529 29.4714 415.029 24.9706L432.971 7.02944Z"
              fill="#3827C7"
            />
          </g>
          <defs>
            <clipPath id="clip0_51293_76934">
              <rect width="640" height="528" rx="24" fill="white" />
            </clipPath>
          </defs>
        </Svg>
      }
      inFront={
        range(475, 680) || gte(850) ? (
          <Image
            width={
              range(625, 680) || gte(1175)
                ? 15.5
                : range(575, 625) || range(955, 1175)
                  ? 14
                  : range(525, 575) || range(875, 955)
                    ? 12
                    : 10
            }
            height={
              range(625, 680) || gte(1175)
                ? 15.5
                : range(575, 625) || range(955, 1175)
                  ? 14
                  : range(525, 575) || range(875, 955)
                    ? 12
                    : 10
            }
            moveDown={
              range(575, 680) || gte(1125)
                ? 3.5
                : range(525, 575) || range(975, 1125)
                  ? 4
                  : 2
            }
            moveLeft={range(425, 680) || gte(850) ? 1 : 0}
            alignX="end"
            source="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6724b0e35469b6c95d201f65_calculator-illustration.avif"
            description="Yellow sparkle calculator"
          />
        ) : undefined
      }
    >
      <Text
        size={
          range(625, 680) || gte(1225)
            ? 5
            : range(1175, 1225)
              ? 4.5
              : range(575, 625) || range(975, 1175)
                ? 4
                : range(475, 575) || range(925, 975)
                  ? 3.9
                  : range(425, 475) || range(875, 925)
                    ? 3.5
                    : range(750, 875)
                      ? 3
                      : 2.5
        }
        color={Color.white}
        weight={500}
        spacing={0.35}
        decorations={TextDecoration().textTransform("uppercase")}
      >
        project <br /> cost <br /> calculator
      </Text>

      <Box
        alignY="end"
        width="fill"
        padding={[range(425, 680) || gte(825) ? 2 : 1.5, 0, 0, 0]}
        spacing={1.5}
        decorations={BoxDecoration()
          .borderTopWidth(0.0625)
          .borderTopColor(Color.white)}
      >
        <Image
          alignY="center"
          width={
            range(481, 680) || gte(875)
              ? 4
              : range(425, 481) || range(775, 875)
                ? 3
                : 2
          }
          height={
            range(481, 680) || gte(875)
              ? 4
              : range(425, 481) || range(775, 875)
                ? 3
                : 2
          }
          source={[
            import.meta.env.VITE_PUBLIC_ASSETS_URL +
              import.meta.env.BASE_URL +
              "/images/avatar-of-the-woman.avif",
            import.meta.env.VITE_PUBLIC_ASSETS_URL +
              import.meta.env.BASE_URL +
              "/images/avatar-of-the-woman.webp",
            import.meta.env.VITE_PUBLIC_ASSETS_URL +
              import.meta.env.BASE_URL +
              "/images/avatar-of-the-woman.png",
          ]}
          description="Smiling woman on yellow background"
          decorations={ImageDecoration()
            .backgroundColor(Color.coolGray20)
            .borderRadius(999)}
        />
        <Text
          size={
            range(575, 680) || gte(975)
              ? 1.25
              : range(425, 575) || range(825, 975)
                ? 1
                : 0.75
          }
          spacing={0.7}
          alignY="center"
          color={Color.white}
          decorations={TextDecoration().textTransform("uppercase")}
        >
          let's estimate your <br /> project in a couple clicks
        </Text>
        <Text
          size={range(425, 680) || gte(925) ? 2.5 : 2}
          alignX="end"
          alignY="center"
        >
          👉
        </Text>
      </Box>
    </Box>
  );
}
