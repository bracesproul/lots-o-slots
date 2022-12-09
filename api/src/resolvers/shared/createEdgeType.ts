import * as Relay from 'graphql-relay';
import { ClassType, Field, ObjectType } from 'type-graphql';

/**
 * NOTE: this function dynamically generates a class representing the edge
 */
export default function createEdgeType<NodeType>(
  nodeName: string,
  nodeType: ClassType<NodeType>
) {
  @ObjectType(`${nodeName}Edge`, { isAbstract: true })
  abstract class Edge implements Relay.Edge<NodeType> {
    @Field(() => nodeType)
    node!: NodeType;

    @Field(() => String, {
      description: 'Used in `before` and `after` args',
    })
    cursor!: Relay.ConnectionCursor;
  }

  return Edge;
}
