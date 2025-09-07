'use client';

import { useRouterState } from '@tanstack/react-router';

/**
 * Hook para determinar se um path está ativo baseado na URL atual
 */
export function useActivePath() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  /**
   * Verifica se um path está ativo
   * @param path - O caminho a ser verificado
   * @param exact - Se deve ser uma correspondência exata (padrão: true)
   * @returns true se o path estiver ativo
   */
  const isActive = (path: string, exact = true): boolean => {
    if (exact) {
      return pathname === path;
    }

    // Para paths não exatos, verifica se o pathname atual começa com o path
    // mas adiciona algumas verificações especiais para evitar falsos positivos
    if (path === '/admin') {
      // Para a rota admin, só deve estar ativa se for exatamente '/admin'
      return pathname === '/admin';
    }

    return pathname.startsWith(path);
  };

  return { isActive, pathname };
}
