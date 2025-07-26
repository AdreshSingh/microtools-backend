<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# PDF Merge API

A NestJS application that provides an API endpoint to merge multiple PDF files into a single PDF.

## Features

- Merge multiple PDF files into a single PDF
- File validation (only accepts PDF files)
- File size limits (10MB per file, max 10 files)
- Error handling for invalid uploads
- Downloadable merged PDF response

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The application will start on `http://localhost:3000`

## API Endpoints

### POST /pdf/merge

Merges multiple PDF files into a single PDF.

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/pdf/merge`
- Content-Type: `multipart/form-data`
- Body: Form data with key `files` containing multiple PDF files

**Example using curl:**

```bash
curl -X POST http://localhost:3000/pdf/merge \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "files=@document3.pdf" \
  --output merged.pdf
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="merged.pdf"`
- Body: Merged PDF file as binary data

### POST /pdf/compress

Compresses a single PDF file to reduce its size.

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/pdf/compress`
- Content-Type: `multipart/form-data`
- Body: Form data with key `file` containing a PDF file

**Example using curl:**

```bash
curl -X POST http://localhost:3000/pdf/compress \
  -F "file=@document.pdf" \
  --output compressed.pdf
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="compressed.pdf"`
- Body: Compressed PDF file as binary data

### POST /pdf/split

Extracts specific pages from a PDF file.

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/pdf/split`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: PDF file
  - `range`: Page range string (e.g., "2-5" or "1,3,5")

**Example using curl:**

```bash
curl -X POST http://localhost:3000/pdf/split \
  -F "file=@document.pdf" \
  -F "range=2-5" \
  --output split.pdf
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="split.pdf"`
- Body: Split PDF file as binary data

### POST /pdf/watermark

Adds a text watermark to all pages of a PDF.

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/pdf/watermark`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: PDF file
  - `text`: Watermark text string

**Example using curl:**

```bash
curl -X POST http://localhost:3000/pdf/watermark \
  -F "file=@document.pdf" \
  -F "text=CONFIDENTIAL" \
  --output watermarked.pdf
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="watermarked.pdf"`
- Body: Watermarked PDF file as binary data

### POST /pdf/reorder

Reorders pages in a PDF according to specified order.

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/pdf/reorder`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: PDF file
  - `order`: Page order string (e.g., "3,1,2")

**Example using curl:**

```bash
curl -X POST http://localhost:3000/pdf/reorder \
  -F "file=@document.pdf" \
  -F "order=3,1,2" \
  --output reordered.pdf
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="reordered.pdf"`
- Body: Reordered PDF file as binary data

### POST /pdf/to-images

Converts each page of a PDF to PNG images (currently unavailable).

**Request:**

- Method: `POST`
- URL: `http://localhost:3000/pdf/to-images`
- Content-Type: `multipart/form-data`
- Body: Form data with key `file` containing a PDF file

**Note:** This endpoint is currently unavailable due to library compatibility issues. For production use, consider using `pdf-poppler` or similar libraries.

**Response:**

- Content-Type: `application/zip`
- Content-Disposition: `attachment; filename="pdf_images.zip"`
- Body: ZIP file containing PNG images of each page

## Validation Rules

- Minimum 2 PDF files required
- Maximum 10 PDF files allowed
- Maximum file size: 10MB per file
- Only PDF files are accepted (MIME type: `application/pdf`)

## Error Handling

The API returns appropriate error messages for:

- No files provided
- Less than 2 files provided
- Invalid file types (non-PDF files)
- File size exceeded
- PDF processing errors

## Testing

You can test the API using:

1. **Postman**: Use the form-data body type with key `files` and multiple PDF files
2. **Frontend**: Use the provided `test-pdf-api.html` file to test the API in a browser
3. **curl**: Use the curl command example above

## Dependencies

- `@nestjs/common`: NestJS framework
- `@nestjs/platform-express`: Express platform for NestJS
- `pdf-lib`: PDF manipulation library
- `multer`: File upload middleware
- `@types/multer`: TypeScript types for multer
