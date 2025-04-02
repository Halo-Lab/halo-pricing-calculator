import { FC, JSX } from "react";

import { IoTIcon } from "./IoTIcon";
import { PdfIcon } from "./PdfIcon";
import { SvgProps } from "../../ui/Svg";
import { PlusIcon } from "./PlusIcon";
import { SaaSIcon } from "./SaaSIcon";
import { Web3Icon } from "./Web3Icon";
import { CloseIcon } from "./CloseIcon";
import { StarsIcon } from "./StarsIcon";
import { HeartIcon } from "./HeartIcon";
import { CheckIcon } from "./CheckIcon";
import { AgencyIcon } from "./AgencyIcon";
import { LoaderIcon } from "./LoaderIcon";
import { WebsiteIcon } from "./WebsiteIcon";
import { FashionIcon } from "./FashionIcon";
import { FinanceIcon } from "./FinanceIcon";
import { WellnessIcon } from "./WellnessIcon";
import { DownloadIcon } from "./DownloadIcon";
import { HaloLogoIcon } from "./HaloLogoIcon";
import { LinkedInIcon } from "./LinkedInIcon";
import { CalendarIcon } from "./CalendarIcon";
import { LogisticsIcon } from "./LogisticsIcon";
import { OpenBookIcon } from "./OpenBookIcon";
import { InsuranceIcon } from "./InsuranceIcon";
import { ECommerceIcon } from "./ECommerceIcon";
import { EducationIcon } from "./EducationIcon";
import { HealthcareIcon } from "./HealthcareIcon";
import { RealEstateIcon } from "./RealEstateIcon";
import { WritingPenIcon } from "./WritingPenIcon";
import { ChevronRightIcon } from "./ChevronRightIcon";
import { EntertainmentIcon } from "./EntertainmentIcon";
import { SocialNetworkIcon } from "./SocialNetworkIcon";
import { WebApplicationIcon } from "./WebApplicationIcon";
import { OtherIndustriesIcon } from "./OtherIndustriesIcon";
import { MobileApplicationIcon } from "./MobileApplicationIcon";

export type IconVariant =
  | "iot"
  | "pdf"
  | "web3"
  | "plus"
  | "saas"
  | "close"
  | "stars"
  | "check"
  | "heart"
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
  | "halo-logo"
  | "linkedin"
  | "calendar"
  | "healthcare"
  | "e-commerce"
  | "open-book"
  | "real-estate"
  | "writing-pen"
  | "entertainment"
  | "chevron-right"
  | "social-network"
  | "web-application"
  | "other-industries"
  | "mobile-application";

const ICON_COMPONENTS: Record<IconVariant, FC<IconComponentProps>> = {
  iot: IoTIcon,
  pdf: PdfIcon,
  web3: Web3Icon,
  plus: PlusIcon,
  saas: SaaSIcon,
  close: CloseIcon,
  stars: StarsIcon,
  check: CheckIcon,
  heart: HeartIcon,
  agency: AgencyIcon,
  loader: LoaderIcon,
  fashion: FashionIcon,
  finance: FinanceIcon,
  website: WebsiteIcon,
  wellness: WellnessIcon,
  download: DownloadIcon,
  linkedin: LinkedInIcon,
  calendar: CalendarIcon,
  insurance: InsuranceIcon,
  education: EducationIcon,
  logistics: LogisticsIcon,
  healthcare: HealthcareIcon,
  entertainment: EntertainmentIcon,
  "open-book": OpenBookIcon,
  "halo-logo": HaloLogoIcon,
  "e-commerce": ECommerceIcon,
  "real-estate": RealEstateIcon,
  "writing-pen": WritingPenIcon,
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
