export class Role {
    name: string;
    description: string;
    claims: Claim[];
}

export class Claim {
    name: string;
    moduleName: string;
    description: string;
}