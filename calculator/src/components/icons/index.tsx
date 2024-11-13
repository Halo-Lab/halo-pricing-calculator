import { FC, JSX } from "react";

import { IoTIcon } from "./IoTIcon";
import { SvgProps } from "../../ui/Svg";
import { PlusIcon } from "./PlusIcon";
import { SaaSIcon } from "./SaaSIcon";
import { Web3Icon } from "./Web3Icon";
import { CloseIcon } from "./CloseIcon";
import { CheckIcon } from "./CheckIcon";
import { AgencyIcon } from "./AgencyIcon";
import { LoaderIcon } from "./LoaderIcon";
import { WebsiteIcon } from "./WebsiteIcon";
import { FashionIcon } from "./FashionIcon";
import { FinanceIcon } from "./FinanceIcon";
import { WellnessIcon } from "./WellnessIcon";
import { DownloadIcon } from "./DownloadIcon";
import { LogisticsIcon } from "./LogisticsIcon";
import { InsuranceIcon } from "./InsuranceIcon";
import { ECommerceIcon } from "./ECommerceIcon";
import { EducationIcon } from "./EducationIcon";
import { HealthcareIcon } from "./HealthcareIcon";
import { RealEstateIcon } from "./RealEstateIcon";
import { ChevronRightIcon } from "./ChevronRightIcon";
import { EntertainmentIcon } from "./EntertainmentIcon";
import { SocialNetworkIcon } from "./SocialNetworkIcon";
import { WebApplicationIcon } from "./WebApplicationIcon";
import { OtherIndustriesIcon } from "./OtherIndustriesIcon";
import { MobileApplicationIcon } from "./MobileApplicationIcon";

export type IconVariant =
  | "iot"
  | "web3"
  | "plus"
  | "saas"
  | "close"
  | "check"
  | "agency"
  | "loader"
  | "fashion"
  | "website"
  | "finance"
  | "wellness"
  | "download"
  | "education"
  | "logistics"
  | "insurance"
  | "healthcare"
  | "e-commerce"
  | "real-estate"
  | "entertainment"
  | "chevron-right"
  | "social-network"
  | "web-application"
  | "other-industries"
  | "mobile-application";

const ICON_COMPONENTS: Record<IconVariant, FC<IconComponentProps>> = {
  iot: IoTIcon,
  web3: Web3Icon,
  plus: PlusIcon,
  saas: SaaSIcon,
  close: CloseIcon,
  check: CheckIcon,
  agency: AgencyIcon,
  loader: LoaderIcon,
  fashion: FashionIcon,
  finance: FinanceIcon,
  website: WebsiteIcon,
  wellness: WellnessIcon,
  download: DownloadIcon,
  insurance: InsuranceIcon,
  education: EducationIcon,
  logistics: LogisticsIcon,
  healthcare: HealthcareIcon,
  entertainment: EntertainmentIcon,
  "e-commerce": ECommerceIcon,
  "real-estate": RealEstateIcon,
  "chevron-right": ChevronRightIcon,
  "social-network": SocialNetworkIcon,
  "web-application": WebApplicationIcon,
  "other-industries": OtherIndustriesIcon,
  "mobile-application": MobileApplicationIcon,
};

export type IconComponentProps = Omit<IconProps, "variant">;

export interface IconProps extends Omit<SvgProps, "viewBox"> {
  variant: IconVariant;
  invertColor?: SvgProps["color"];
}

export function Icon({ variant, ...props }: IconProps): JSX.Element {
  const Component = ICON_COMPONENTS[variant];

  if (import.meta.env.DEV && !Component) {
    throw new Error(`The "${variant}" is an unknown icon variant.`);
  }

  return <Component {...props} />;
}
