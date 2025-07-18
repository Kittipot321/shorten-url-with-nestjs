import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateUrlDto {

    @IsUrl({}, { message: "Please provide a valid URL."})
    originalUrl: string

    @IsOptional()
    @IsString()
    @Length(4, 10, { message: "Custom code must be between 4 and 10 characters"})
    customCode?: string
}
