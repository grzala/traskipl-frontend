type UserType = {
    first_name: string;
    last_name: string;
    full_name: string;

    email: string;


    created_at: Date;
    total_routes_added?: number
}

type currentUserType = UserType | null;


type userContextType = {
    user: currentUserType,
    onLogin: (userLoginData: {user: {email: string, password: string}}) => void,
    onLogout: () => void
}

export type { UserType, userContextType, currentUserType };