export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	avatar: string;
	created_at: Date;
	updated_at: Date;
}

export interface IUserAndAvatar extends IUser {
	getAvatarUrl: string | null;
}
