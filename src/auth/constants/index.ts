export type JWTObject = Record<any, any> & { iat: number; exp: number };
export const jwtConstants = {
  secret: 'Y3DhnXS2gP<6G4ef',
};
