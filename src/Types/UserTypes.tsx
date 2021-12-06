type UserType = {
    first_name: string;
    last_name: string;

    email: string;
}

type currentUserType = UserType | null;


type userContextType = {
    user: currentUserType,
    login: (email: string, password: string) => void,
    logout: () => void
}

export type { UserType, userContextType };