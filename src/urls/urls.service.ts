import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlResponseDto } from './dto/url-reponse.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Url } from '@prisma/client';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService){}

  async createShortUrl(createUrlDto: CreateUrlDto, baseUrl: string): Promise<UrlResponseDto> {
    const {originalUrl, customCode} = createUrlDto

    let shortCode = customCode
    if (!shortCode){
      shortCode = this.generateShortCode()

      while (await this.prisma.url.findFirst({where: { shortCode }})) {
        shortCode = this.generateShortCode()
      }
    } else {
      const existingUrl =  await this.prisma.url.findFirst({
        where: {
          shortCode
        }
      })
      
      if (existingUrl) {
        throw new ConflictException("Custom code already exists")
      }
    }

    const url = await this.prisma.url.create({
      data: {
        originalUrl,
        shortCode
      }
    })

    return {
      id: url.id,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      shortUrl: `${baseUrl}/${url.shortCode}`
    }
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const url = await this.prisma.url.findFirst({
      where: {
        shortCode
      }
    })

    if (!url) {
      throw new NotFoundException("Short URL not found")
    }

    await this.prisma.url.update({
      where: {
        id: url.id
      },
      data: {
        clickCount: {
          increment: 1
        }
      }
    })

    return url.originalUrl;
    
  }

  async getUrlStats(shortCode: string): Promise<UrlResponseDto> {
    const url = await this.prisma.url.findFirst({
      where: {
        shortCode
      }
    })

    if (!url) {
      throw new NotFoundException("Short URL not found")
    }

    return {
      id: url.id,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${url.shortCode}`,
    };
  }

  async getAllUrls(): Promise<Url[]> {
    const getAllUrls = await this.prisma.url.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    return getAllUrls
  }

  async deleteUrl(shortCode: string): Promise<void> {
    const url = await this.prisma.url.findFirst({
      where: {
        shortCode
      }
    })

    if (!url) {
      throw new NotFoundException("Short URL not found")
    }

    await this.prisma.url.delete({
      where: {
        id : url.id
      }
    })
  }

  private generateShortCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i=0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result;
  }
}
