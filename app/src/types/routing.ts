export interface RouteConfig {
  // Path pattern - can use /* for wildcard matching
  path: string

  // Default is inherited from global defaults
  isPublic?: boolean

  // Specific sub-routes that override the parent route's settings
  // These take precedence over wildcard matches
  overrides?: RouteConfig[]
}

export interface AuthRedirectConfig {
  // Path to redirect when user is not logged in
  signInPagePath: string

  // Path to redirect to after successful authentication
  postAuthRedirectPath: string

  // Default access denied page
  defaultAccessDeniedPath: string

}

export interface RoutingConfiguration {
  defaults: {
    isPublic: boolean
    redirects: AuthRedirectConfig
  }
  routes: RouteConfig[]
}
