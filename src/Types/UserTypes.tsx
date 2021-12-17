type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;

    email: string;


    created_at: Date;
    total_routes_added?: number
}

type UserSignupType = {
    first_name: string;
    last_name: string;

    email: string;

    password: string;
    password_confirmation: string;
}

type currentUserType = UserType | null;


type userContextType = {
    user: currentUserType,
    onLogin: (userLoginData: {user: {email: string, password: string}}) => Promise<boolean>,
    onLogout: () => void
}

export type { UserType, userContextType, currentUserType, UserSignupType };