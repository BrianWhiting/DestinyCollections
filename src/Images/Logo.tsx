import * as React from 'react';

export const Logo: React.FunctionComponent<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 329.81 329.81"
      className={className}
    >
      <defs>
        <style>
          {'.a{fill:#efefef;}.b{fill:url(#a);}.c{fill:url(#b);}'}
        </style>
        <linearGradient
          id="a"
          x1="47.56"
          y1="119.42"
          x2="331.31"
          y2="119.42"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="#38a7de"
          />
          <stop
            offset="1"
            stopColor="#84c265"
          />
        </linearGradient>
        <linearGradient
          id="b"
          x1="66.26"
          y1="164.9"
          x2="332.36"
          y2="164.9"
          gradientTransform="translate(204.94 -164.94) rotate(45)"
          xlinkHref="#a"
        />
      </defs>
      <title>light</title>
      <polygon
        className="a"
        points="136.45 119.42 173.42 156.39 218.9 201.87 224.59 207.56 227.42 210.39 224.59 213.22 218.9 218.9 173.42 264.39 167.74 270.07 164.91 272.9 162.08 270.07 156.39 264.39 110.91 218.9 73.94 181.93 45.48 210.39 164.91 329.81 284.33 210.39 164.91 90.97 136.45 119.42"
      />
      <polygon
        className="b"
        points="193.36 210.39 156.39 173.42 110.91 127.94 105.22 122.25 102.39 119.42 105.22 116.59 110.91 110.91 156.39 65.42 162.08 59.74 164.91 56.91 167.74 59.74 173.42 65.42 218.9 110.91 255.87 147.88 284.33 119.42 164.91 0 45.48 119.42 164.91 238.84 193.36 210.39"
      />
      <rect
        className="c"
        x="281.59"
        y="144.93"
        width="39.95"
        height="39.95"
        transform="translate(-28.28 261.55) rotate(-45)"
      />
      <rect
        className="a"
        x="8.27"
        y="144.93"
        width="39.95"
        height="39.95"
        transform="translate(-108.34 68.28) rotate(-45)"
      />
    </svg>
  );
}