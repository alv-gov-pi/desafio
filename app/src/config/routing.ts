import { RoutingConfiguration } from '@/types/routing'


export const routingConfig: RoutingConfiguration = {
  defaults: {
    isPublic: true,
    redirects: {
      postAuthRedirectPath: '/api/auth/role-redirect',
      signInPagePath: '/api/auth/sign-in',
      defaultAccessDeniedPath: '/acesso-negado',
    }
  },
  routes: [
    {
      path: '/:eventId/admin/*',
      isPublic: false,
      overrides: [
        {
          path: '/:eventId/admin/acesso-negado',
          isPublic: true
        }
      ]
    },
    {
      path: '/conselheiros/*',
      isPublic: false,
      overrides: [
        {
          path: '/conselheiros/acesso-negado',
          isPublic: true
        },
        {
          path: '/conselheiros/cadastro/*'
        }
      ]
    }
  ]
}