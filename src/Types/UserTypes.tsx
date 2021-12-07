type UserType = {
    first_name: string;
    last_name: string;

    email: string;
}

type currentUserType = UserType | null;


type userContextType = {
    user: currentUserType,
    onLogin: (email: string, password: string) => void,
    onLogout: () => void
}

export type { UserType, userContextType };