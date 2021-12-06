type User = {
    first_name: string;
    last_name: string;

    email: string;
}

type currentUserType = User | null;

export type { User, currentUserType };