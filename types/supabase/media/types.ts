type ReferenceType = 'milestone' | 'pronunciation';

export type media = {
    media_url: string;
    filename: string;
    s3_key: string;
    media_type: 'image' | 'video';
    content_type: string;
} & {
        [key in `${ReferenceType}`]?: number; // 👈 dynamic foreign key
    };