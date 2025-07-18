import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, Res } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Request, Response } from 'express';
import { UrlResponseDto } from './dto/url-reponse.dto';
import { Url } from '@prisma/client';

@Controller('')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post("api/shorten")
  async createShortUrl(
    @Body(ValidationPipe) dto : CreateUrlDto,
    @Req() request: Request
  ): Promise<UrlResponseDto> {
    const baseUrl = `${request.protocol}://${request.get("host")}`
    return this.urlsService.createShortUrl(dto, baseUrl)
  }


  @Get(":shortCode")
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response
  )
  {
    try {
      const originalUrl = await this.urlsService.getOriginalUrl(shortCode)
      return res.redirect(301, originalUrl)
    } catch (error) {
      return res.status(404).json({ message: "Short URL not found."})
    }
  }
  
  @Get("api/urls")
  async getAllUrls(): Promise<Url[]> {
    return this.urlsService.getAllUrls();
  }

  @Get("api/stats/:shortCode")
  async getUrlStats(@Param('shortCode') shortCode: string): Promise<UrlResponseDto> {
    return this.urlsService.getUrlStats(shortCode);
  }

  @Delete("api/urls/:shortCode")
  async deleteUel(@Param('shortCode') shortCode: string): Promise<{ message: string }> {
    await this.urlsService.deleteUrl(shortCode)
    return {
      message: "URL deleted successfully"
    }
  }
}
