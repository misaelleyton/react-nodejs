import React from 'react'
import { SvgIcon } from '@mui/material'
import type { IconsParams } from './types'

function Pickup (): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 178.17 70.444'
    >
      <g transform='translate(-196.56 -422.02)'>
        <g>
          <path
            strokeWidth='0.595'
            d='M201.74 473.38l72.425-.045 5.437 6.997 69.23-.044c2.763 0 6.833-.082 9.69-.695 6.915-1.488 10.44-8.697 10.44-18.205h-167.23v11.992z'
          ></path>
          <path
            strokeWidth='1.5'
            d='M368.94 471.47c-4.865 4.867-5.91 5.875-8.395 6.1-2.484.23-8.127.34-11.066.34l-26.309.113h-40.55v-44.426c0-10.812 3.121-10.826 10.123-10.826h8.658c5.633 0 12.225-.068 15.736 1.172 2.49.879 2.938 1.567 4.416 2.924l17.592 17.824s29.797.523 29.797 8.682v18.097z'
          ></path>
          <path
            strokeWidth='0.748'
            d='M358.49 478.03l-1.45-10.809c-.56-3.443-3.63-7.145-7.6-7.145h-12.391c-5.68 0-8.471 4.1-9.625 7.895l-2.758 10.059'
          ></path>
          <circle
            cx='277.61'
            cy='78.314'
            r='14.264'
            stroke='#fff'
            strokeWidth='0.876'
            transform='translate(64.652 399.37)'
          ></circle>
          <circle
            cx='277.6'
            cy='78.314'
            r='8.008'
            fill='#fff'
            strokeWidth='1.325'
            transform='translate(64.652 399.37)'
          ></circle>
          <path
            fill='#fff'
            d='M360.22 473.06c0 1.498.42 3.166 1.916 3.166h10.174c1.494 0 1.916-1.668 1.916-3.166v-2.254c0-1.5-.422-3.164-1.916-3.164h-10.174c-1.496 0-1.916 1.664-1.916 3.164v2.254z'
          ></path>
          <path
            fill='#fff'
            strokeWidth='1.5'
            d='M293.21 444.71a2.71 2.71 0 01-2.709-2.711v-12.416c0-1.5 1.213-2.711 2.709-2.711h28.344l17.592 17.824h-13.879l-32.057.014z'
          ></path>
          <path
            fill='none'
            strokeWidth='0.997'
            d='M317.16 426.87L325.29 444.69'
          ></path>
          <path
            strokeLinecap='round'
            strokeWidth='0.748'
            d='M368.94 454.47h-3.277c-.662 0-.973.545-1.195 1.195l1.598 8.416c0 .662.537 1.195 1.199 1.195h1.676'
          ></path>
          <path
            fill='#fff'
            strokeWidth='0.748'
            d='M317.87 446.16c0 1.104.145 1.994 1.244 1.994h3.248c1.1 0 1.494-.891 1.494-1.994v-5.715c0-1.102-.395-1.99-1.494-1.99h-3.248c-1.1 0-1.244.889-1.244 1.99v5.715z'
          ></path>
          <path
            strokeWidth='1.5'
            d='M201.06 445.04H282.56V477.79H201.06z'
          ></path>
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M357.61 455.45L289.31 455.45'
          ></path>
          <path
            fill='none'
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M275.9 455.45L206.31 455.45'
          ></path>
          <path
            strokeWidth='0.748'
            d='M252.04 478.03l-1.45-10.809c-.56-3.443-3.63-7.145-7.6-7.145h-12.391c-5.68 0-8.471 4.1-9.625 7.895l-2.758 10.059'
          ></path>
          <circle
            cx='170.98'
            cy='78.395'
            r='14.263'
            stroke='#fff'
            strokeWidth='0.876'
            transform='translate(64.652 399.37)'
          ></circle>
          <circle
            cx='170.98'
            cy='78.395'
            r='8.008'
            fill='#fff'
            strokeWidth='1.325'
            transform='translate(64.652 399.37)'
          ></circle>
          <path
            fill='red'
            d='M197.06 473.06c0 1.498.42 3.166 1.916 3.166h5.424c1.494 0 1.916-1.668 1.916-3.166v-2.254c0-1.5-.422-3.164-1.916-3.164h-5.424c-1.496 0-1.916 1.664-1.916 3.164v2.254z'
          ></path>
        </g>
      </g>
    </svg>
  )
}

const PickupIcon: React.FC<IconsParams> = ({ iconColor }): JSX.Element => {
  return <SvgIcon style={{ color: iconColor }}>
          <Pickup />
        </SvgIcon>
}

export default PickupIcon
