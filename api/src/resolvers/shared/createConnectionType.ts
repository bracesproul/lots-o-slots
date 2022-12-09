import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { Connection } from './Connection';
import createEdgeType from './createEdgeType';
import PageInfo from './PageInfo';

/**
 * NOTE: this function dynamically generates a class representing the connection
 */
export default function createConnectionType<NodeType>(
  nodeName: string,
  nodeClass: ClassType<NodeType>
) {
  @ObjectType(`${nodeName}Edge`)
  class Edge extends createEdgeType(nodeName, nodeClass) {}

  @ObjectType(`${nodeName}Connection`, { isAbstract: true })
  abstract class CustomConnection implements Connection<NodeType> {
    @Field(() => PageInfo)
    pageInfo!: PageInfo;

    @Field(() => [Edge], {
      nullable: false,
    })
    edges!: Edge[];

    @Field(() => [nodeClass], {
      nullable: true,
    })
    nodes!: NodeType[] | null;

    @Field(() => Int, {
      nullable: false,
    })
    count!: number;

    @Field(() => Int, {
      nullable: false,
    })
    totalCount!: number;
  }

  return CustomConnection;
}
