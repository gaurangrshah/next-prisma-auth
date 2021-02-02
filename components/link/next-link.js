import * as React from 'react'
import { ConditionalLink } from './conditional-link'
import {useIsActive} from "./utils"


export const NextLink = props => {
  const { link, href, nextAs, children, replace, scroll, shallow, ...rest } = props
  const currentLink = link?.path ? `${link?.prefix}${link?.path.toLowerCase() === 'home' ? null : link.path}` : href
  const isActive = useIsActive(href)
  console.log(link)
  return (
    // condiitionally check if link is external before rendering
    <ConditionalLink
      passHref={!nextAs && isExternal(link?.prefix)}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      href={currentLink}
      as={nextAs}
      aria-current={isActive ? 'page' : undefined}
    >
      {link?.label}
    </ConditionalLink>
  );
}
