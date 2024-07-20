'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect, FC } from 'react'
import React from "react"

interface TS {
  handleTheme: (props: string) => void | undefined;
  theme: string;
}

const ThemeSwitch: FC<TS> = ({ handleTheme, theme }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSwitchTheme = (value: string) => {
    console.log(value)
    if (handleTheme) handleTheme(value)
  }

  if (!mounted) {
    return (
      <img
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        title="Loading Light/Dark Toggle"
      />
    )
  }

  if (theme === 'dark') {
    return <FiSun className="text-white" onClick={() => handleSwitchTheme("light")} />
  }

  if (theme === 'light') {
    return <FiMoon onClick={() => handleSwitchTheme("dark")} />
  }

  return null
}

export default ThemeSwitch
