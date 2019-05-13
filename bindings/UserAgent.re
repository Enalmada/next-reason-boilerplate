[@bs.module "@quentin-sommer/react-useragent"] [@react.component]
external make:
  (
    ~computer: option(bool)=?,
    ~windows: option(bool)=?,
    ~linux: option(bool)=?,
    ~mac: option(bool)=?,
    ~mobile: option(bool)=?,
    ~tablet: option(bool)=?,
    ~android: option(bool)=?,
    ~ios: option(bool)=?,
    ~firefox: option(bool)=?,
    ~chrome: option(bool)=?,
    ~edge: option(bool)=?,
    ~safari: option(bool)=?,
    ~children: (bool, bool) => React.element
  ) =>
  React.element =
  "UserAgent";
