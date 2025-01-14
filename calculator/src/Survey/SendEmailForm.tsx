import { JSX, useState } from "react";

import { Box } from "../ui/Box";
import { Icon } from "../components/icons";
import { Link } from "../ui/Link";
import { Color } from "../palettes/colours";
import { units } from "../ui/measurements";
import { FloatingInput } from "../components/FloatingInput";
import { useBreakpoints } from "../ui/Responsiveness";
import { Svg, SvgDecoration } from "../ui/Svg";
import { Text, TextDecoration } from "../ui/Text";
import { Button, ButtonDecoration } from "../ui/Button";
import { Viewport, ViewportDecoration } from "../ui/Viewport";

interface SendEmailFormProps {
  closeForm(): void;
  onEmailSent(): void;
}

export function SendEmailForm({
  closeForm,
  onEmailSent,
}: SendEmailFormProps): JSX.Element {
  const { gte } = useBreakpoints();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Viewport
      padding={1}
      decorations={ViewportDecoration()
        .backgroundColor(Color.blueDark85)
        .backdropFilter(`blur(${units(2.8125)})`)}
    >
      <Box
        alignY="center"
        alignX="center"
        onRight={
          <Button
            width={2.5}
            height={2.5}
            moveUp={0.5}
            moveRight={0.5}
            onPress={closeForm}
          >
            <Icon
              width="fill"
              height="fill"
              variant="close"
              color={Color.white}
              invertColor={Color.transparent}
              decorations={SvgDecoration().opacity(0.7)}
            />
          </Button>
        }
        behindContent={
          <Svg
            width="fill"
            height="fill"
            viewBox="0 0 416 536"
            preserveAspectRatio="none"
          >
            <path
              d="M0 24C0 10.7452 10.7452 0 24 0H326.059C332.424 0 338.529 2.52856 343.029 7.02944L408.971 72.9706C413.471 77.4714 416 83.5759 416 89.9411V512C416 525.255 405.255 536 392 536H24C10.7452 536 0 525.255 0 512V24Z"
              fill="white"
            />
          </Svg>
        }
        spacing={1}
        vertical
        width="fill"
        maxWidth={26}
        padding={gte(430) ? 2.5 : [1.5, 1.25, 1.25]}
      >
        <Box vertical width="fill" spacing={2.5}>
          <Box vertical width="fill" spacing={3.125}>
            <Box vertical width="fill" spacing={1.375}>
              <Text width="fill" weight={500} size={1.75} density={0.965}>
                Get an estimate
              </Text>
              <FloatingInput
                label="Full name"
                type="text"
                hint="username"
                value={username}
                required
                onChange={(event) => {
                  setUserName(event.currentTarget.value);
                }}
              />
              <FloatingInput
                value={email}
                label="Email"
                type="email"
                hint="email"
                required
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                }}
              />
            </Box>

            {/* Webflow will attach styles to the next element */}
            <input type="tel" />
          </Box>

          <Button
            width="fill"
            padding={0.75}
            decorations={ButtonDecoration()
              .backgroundColor(Color.yellow)
              .borderRadius(6.25)}
            onPress={() => {
              onEmailSent();
            }}
          >
            <Text
              alignY="center"
              alignX="center"
              size={0.875}
              weight={500}
              density={1.04375}
              decorations={TextDecoration()
                .textTransform("uppercase")
                .fontFeatureSettings("'liga' off, 'clig' off")}
            >
              send request
            </Text>
            <Icon
              width={2}
              height={2}
              alignX="end"
              variant="writing-pen"
              invertColor={Color.white}
            />
          </Button>
        </Box>

        <Text
          size={0.75}
          spacing={0.6}
          alignX="center"
          width={gte(420) ? ".8fr" : "fill"}
          color={Color.blueDark70}
          decorations={TextDecoration().textAlign("center")}
        >
          By sending this form I confirm that I have read and accept the{" "}
          <Link url="/cookie-policy#halo-lab-privacy-policy">
            <Text color={Color.blue} size={0.75}>
              Privacy Policy
            </Text>
          </Link>
        </Text>
      </Box>
    </Viewport>
  );
}
