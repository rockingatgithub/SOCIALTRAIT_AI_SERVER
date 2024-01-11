import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
export type NewsDocument = HydratedDocument<News>;

@Schema()
export class News {

    @Prop({ isRequired: true })
    title: string;

    @Prop()
    author: string;

    @Prop()
    postedTime: string;

    @Prop({default: now()})
    createdAt: Date

    @Prop({default: now()})
    updatedAt: Date

}

export const NewsSchema = SchemaFactory.createForClass(News);