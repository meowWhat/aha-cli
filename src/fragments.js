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
 * @param { {moduleName:string} } slots
 */
const getController = (slots) => {
  return parser.parse(
    `import { Controller, Get } from '@nestjs/common'
    
@Controller('$moduleName$')
export class $moduleName$Controller {
  @Get()
  findAll(): string {
    return 'This action returns all cats'
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
  private readonly cats = []
  create(cat) {
    this.cats.push(cat)
  }
  findAll() {
    return this.cats
  }
}`,
    slots
  )
}

module.exports = {
  getModule,
  getController,
  getService,
}
