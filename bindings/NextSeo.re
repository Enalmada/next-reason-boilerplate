[@bs.deriving abstract]
type imageType = {
  url: string,
  width: int,
  height: int,
  alt: string,
};

[@bs.module "next-seo"] [@react.component]
external make:
  (
    ~title: string=?,
    ~description: string=?,
    ~canonical: string=?,
    ~ogType: string=?,
    ~ogLocale: string=?,
    ~ogUrl: string=?,
    ~ogTitle: string=?,
    ~ogDescription: string=?,
    ~ogDefaultImageWidth: int=?,
    ~ogDefaultImageHeight: int=?,
    ~ogImages: array(imageType)=?,
    ~ogSiteName: string=?,
    ~twitterHandle: string=?,
    ~twitterSite: string=?,
    ~twitterCardType: string=?
  ) =>
  React.element =
  "default";
