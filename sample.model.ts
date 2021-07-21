import 'reflect-metadata';
import {
  Title, Description, ID, Upload,
} from '@mupi/core';

@Title({
  title: '恐龙罗罗囤积的奇怪物品清单',
  subtitle: '恐龙罗罗的家，没事记得收拾收拾杂物哦～',
})
export default class RawrRawrTheDinosaurHoarderItem {
  @Description('ID')
  @ID()
  id: string;

  @Description('奇怪物品的名字')
  name: string;

  @Description('奇怪物品的功能简介')
  description: string;

  @Upload()
  @Description('奇怪物品的封面图片')
  cover: string;
}
