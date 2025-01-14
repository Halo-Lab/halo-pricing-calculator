import { JSX } from "react";

import { Box } from "../ui/Box";
import { Svg } from "../ui/Svg";
import { Link } from "../ui/Link";
import { Color } from "../palettes/colours";
import { useBreakpoints } from "../ui/Responsiveness";
import { AnimatedButton } from "../components/AnimatedButton";
import { Icon, IconVariant } from "../components/icons";
import { Text, TextDecoration } from "../ui/Text";

export interface CTACardData {
  text: string;
  mainIcon: IconVariant;
  interactiveElementText: string;
  interactiveElementIcon: IconVariant;
  interactiveElementLink?: string;
  interactiveElementDataAttributes?: Record<`data-${string}`, string>;
}

interface CTACardProps extends CTACardData {}

export function CTACard({
  text,
  mainIcon,
  interactiveElementIcon,
  interactiveElementText,
  interactiveElementLink,
  interactiveElementDataAttributes,
}: CTACardProps): JSX.Element {
  const { gte } = useBreakpoints();

  const interactableElement = (
    <AnimatedButton
      alignY="end"
      width="fill"
      variant="primary"
      padding={0.25}
      icon={
        <Icon
          alignX="end"
          width={2}
          height={2}
          color={Color.white}
          invertColor={Color.chryslerBlue}
          variant={interactiveElementIcon}
        />
      }
      _extend={interactiveElementDataAttributes}
    >
      <Text
        alignX="center"
        alignY="center"
        size={0.875}
        weight={500}
        density={1.04375}
        color={Color.white}
        decorations={TextDecoration()
          .fontFeatureSettings("'liga' off, 'clig' off")
          .textTransform("uppercase")}
      >
        {interactiveElementText}
      </Text>
    </AnimatedButton>
  );

  return (
    <Box
      height={gte(920) ? "fill" : undefined}
      alignX="center"
      behindContent={
        <Svg
          width="fill"
          height="fill"
          viewBox="0 0 245 340"
          preserveAspectRatio="none"
        >
          <path
            d="M0 19.3404C0 8.65899 8.65901 0 19.3404 0H185.41C190.54 0 195.459 2.03742 199.086 5.66409L239.335 45.9097C242.962 49.5368 245 54.4564 245 59.5861V320.66C245 331.341 236.341 340 225.66 340H19.3404C8.65901 340 0 331.341 0 320.66L0 19.3404Z"
            fill="#F5F5F7"
          />
        </Svg>
      }
      padding={2}
      spacing={4}
      vertical
      maxWidth={15.3125}
    >
      <Box width="fill" alignY="center" spacing={2} vertical>
        <Icon variant={mainIcon} width={4} height={4} />

        <Text size={1.125} weight={500} spacing={0.65} density={0.9775}>
          {text}
        </Text>
      </Box>

      {interactiveElementLink ? (
        <Link
          url={interactiveElementLink}
          openIn="new-tab"
          alignY="end"
          width="fill"
          _extend={interactiveElementDataAttributes}
        >
          {interactableElement}
        </Link>
      ) : (
        interactableElement
      )}
    </Box>
  );
}
