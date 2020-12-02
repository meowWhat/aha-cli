const parser = require('./template')

/**
 * @param { {moduleName:string} } slots
 */
const getModule = (slots) => {
  return parser.parse(
    `import { Module } from '@nestjs/common'
import { $moduleName$Controller } from './$moduleName$.controller'
import { $moduleName$Service } from './$moduleName$.service'

@Module({
  controllers: [$moduleName$Controller],
  providers: [$moduleName$Service],
})

export class $moduleName$Module {}`,
    slots
  )
}

/**
 * @param { {moduleName:string ,route:string} } slots
 */
const getController = (slots) => {
  return parser.parse(
    `import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { $moduleName$Service } from './$moduleName$.service'
    
@Controller('/$route$')
export class $moduleName$Controller {
  constructor(private readonly $route$Service: $moduleName$Service) {}
    
  @Post()
  create(@Body() createCatDto) {
    return 'This action adds a new cat'
  }
    
  @Get()
  findAll(@Query() query) {
    return \`This action returns all cats (limit: \${query.limit} items)\`
   }
    
  @Get(':id')
  findOne(@Param('id') id: string) {
    return \`This action returns a #\${id} cat\`
  }
    
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto) {
    return \`This action updates a #\${id} cat\`
  }
    
  @Delete(':id')
  remove(@Param('id') id: string) {
    return \`This action removes a #\${id} cat\`
  }
}`,
    slots
  )
}

/**
 * @param { {moduleName:string} } slots
 */
const getService = (slots) => {
  return parser.parse(
    `import { Injectable } from '@nestjs/common'
  
@Injectable()
export class $moduleName$Service {
  
}`,
    slots
  )
}

module.exports = {
  getModule,
  getController,
  getService,
}
