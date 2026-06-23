/**
 * Emails com acesso ao painel de administração (/admin).
 * Acrescente aqui o email da Jacline (e outros) quando quiser.
 */
export const adminEmails: string[] = [
  "alcideslafamilia@gmail.com",
  "djeyonecosmeticos@gmail.com",
];

export function isAdminEmail(email?: string | null): boolean {
  return !!email && adminEmails.includes(email.toLowerCase());
}
