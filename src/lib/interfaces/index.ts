export interface Post {
	created_at: Date;
	post_id: string;
	sar_filename: string;
	thumbnail_filename: string;
	title: string;
	user_id: string;
	username: string;
	ingame_name: string;
	ingame_sound_id: number;
	ingame_layer_count: number;
}

export interface TwitterMetadata {
	avatar_url: string;
	email: string;
	email_verified: true;
	full_name: string;
	iss: string;
	name: string;
	picture: string;
	preferred_username: string;
	provider_id: string;
	sub: string;
	user_name: string;
}
